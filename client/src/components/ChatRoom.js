import styles from '../styles/chatroom.module.css';
import ChatRoomMessages from './ChatRoomMessages';
import ChatRoomUsers from './ChatRoomUsers';
import SendMessage from './SendMessage';

const ChatRoom = (props) => {
  return (
      <div className={styles.chatContainer}>
        <ChatRoomUsers
          socket={props.socket}
          username={props.username}
          selectedroom={props.selectedroom}
        />
        <div>
          <ChatRoomMessages socket={props.socket} />
          <SendMessage
            socket={props.socket}
            username={props.username}
            selectedroom={props.selectedroom}
          />
        </div>
      </div>
  );
};

export default ChatRoom;
