const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { Server } = require('socket.io');
const DBConn = require('./config/database');

dotenv.config({ path: './config/config.env' });
const app = express();
DBConn();

app.use(express.json());
app.use(cors());
app.use(express.json());

const leaveRoom = require('./utils/leaveRoomUtil');

const server = app.listen(
  process.env.PORT,
  console.log(`Server running on port ${process.env.PORT}`)
);

const chatMessageService = require('./services/chatMessageService');
const { get } = require('config');

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const CHAT_BOT = 'chatbot';
let chatRoom = '';
let usersInRoom = [];

io.on('connection', (socket) => {
  socket.on('join_room_chat', (data) => {
    const { username, selectedRoom } = data.roomChatdetails;
    socket.join(selectedRoom);

    let createdTime = Date.now();
    socket.to(selectedRoom).emit('receive_message', {
      message: `${username} has joined the room.`,
      username: CHAT_BOT,
      createdTime,
    });

    socket.emit('receive_message', {
      message: `Welcome to chat ${username}`,
      username: CHAT_BOT,
      createdTime,
    });

    socket.on('send_message', (data) => {
      io.in(selectedRoom).emit('receive_message', data);
      chatMessageService.saveChatMessage(data);
    });

    chatRoom = selectedRoom;
    usersInRoom.push({ id: socket.id, username, selectedRoom });
    chatRoomUsers = usersInRoom.filter(
      (user) => user.selectedRoom === selectedRoom
    );
    socket.to(selectedRoom).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);

    socket.on('leave_room', (data) => {
      socket.leave(data.selectedRoom);
      const createdTime = Date.now();

      usersInRoom = leaveRoom(socket.id, usersInRoom);
      socket.to(selectedRoom).emit('chatroom_users', usersInRoom);
      socket.to(selectedRoom).emit('receive_message', {
        username: CHAT_BOT,
        message: `${username} has left the chat`,
        createdTime,
      });

      socket.on('disconnect', () => {
        const user = usersInRoom.find((user) => user.id == socket.id);
        if (user?.username) {
          usersInRoom = leaveRoom(socket.id, usersInRoom);
          socket.to(selectedRoom).emit('chatroom_users', usersInRoom);
          socket.to(selectedRoom).emit('receive_message', {
            message: `${user.username} has disconnected from the chat`,
          });
        }
      });
    });
  });
});
