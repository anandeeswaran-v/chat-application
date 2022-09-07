import styles from '../styles/chatroom.module.css';
import React, { useState } from 'react';

const SendMessage = (props) => {
  const [enteredMessage, setEnteredMessage] = useState([]);

  const setEnteredMessageHandler = (event) => {
    setEnteredMessage(event.target.value);
  };

  const sendMessageHandler = () => {
    let messageDetails = {
      username: props.username,
      message: enteredMessage,
      selectedRoom: props.selectedroom,
      createdTime: Date.now(),
    };
    if (enteredMessage !== '') {
      console.log(messageDetails);
      console.log(props.socket);
      props.socket.emit('send_message', messageDetails);
      setEnteredMessage('');
    }
  };

  return (
    <div className={styles.sendMessageContainer}>
      <input
        className={styles.messageInput}
        placeholder="Message..."
        onChange={setEnteredMessageHandler}
        value={enteredMessage}
      />
      <button className="btn btn-secondary" style={{ color: 'black' }} onClick={sendMessageHandler}>
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;
