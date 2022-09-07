import styles from '../styles/chatroom.module.css';
import { useState, useEffect, useRef } from 'react';

const ChatRoomMessages = (props) => {
  const [receivedMessage, setReceivedMessage] = useState([]);
  const messagesColumRef = useRef(null);

  useEffect(() => {
    props.socket.on('receive_message', (data) => {
      setReceivedMessage((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          createdTime: data.createdTime,
        },
      ]);
    });

    return () => props.socket.off('receive_message');
  }, [props.socket]);

  useEffect(() => {
    messagesColumRef.current.scrollTop = messagesColumRef.current.scrollHeight;
  }, [receivedMessage]);

  const formatDateTime = (timeStamp) => {
    const date = new Date(timeStamp);
    return date.toLocaleDateString();
  };

  return (
    <div className={styles.messagesColumn} ref={messagesColumRef}>
      {receivedMessage.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {formatDateTime(msg.createdTime)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default ChatRoomMessages;
