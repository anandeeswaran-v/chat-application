import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/chatroom.module.css';

const ChatRoomUsers = (props) => {
  const [roomUsers, setRoomUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    props.socket.on('chatroom_users', (data) => {
      setRoomUsers(data);
    });
    return () => props.socket.off('chatroom_users');
  }, [props.socket]);

  const leavRoomHandler = () => {
    let userLeaveRoom = {
      username: props.username,
      selectedRoom: props.selectedroom,
      createdTime: Date.now(),
    };

    props.socket.emit('leave_room', userLeaveRoom);
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.roomAndUsersColumn}>
      <h2 className={styles.roomTitle}>{props.selectedroom}</h2>

      <div>
        {roomUsers.length > 0 && <h5 className={styles.usersTitle}>Users:</h5>}
        <ul className={styles.usersList}>
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === props.username ? 'bold' : 'normal'}`,
                background: `${user.username === props.username ? 'purple' : 'black'}`
              }}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      <button className="btn btn-primary" onClick={leavRoomHandler}>
        Leave
      </button>
    </div>
  );
};

export default ChatRoomUsers;
