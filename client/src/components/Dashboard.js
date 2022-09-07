import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/dashboard.module.css';

const Dashboard = (props) => {
  const navigate = useNavigate();

  const selectRoomChangeHandler = (event) => {
    props.setSelectedRoom(event.target.value);
  };

  const usernameChangeHandler = (event) => {
    props.setUsername(event.target.value);
  };

  const joinRoomHandler = () => {
    if (
      props.username != null &&
      props.username.toString().trim().length > 0 &&
      props.selectedroom !== ''
    ) {
      const roomChatdetails = {
        username: props.username,
        selectedRoom: props.selectedroom,
      };
      props.socket.emit('join_room_chat', { roomChatdetails });

      navigate('/chatroom', { replace: true });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 style={{ width: '100%', color: 'white', textAlign: 'center' }}>
          {' '}
          Let's Chat
        </h1>
        <input
          className={styles.input}
          placeholder="Username"
          onChange={usernameChangeHandler}
        />
        <select className={styles.input} onChange={selectRoomChangeHandler}>
          <option value=""> -- Select Room -- </option>
          <option value="Room 1">Room 1</option>
          <option value="Room 2">Room 2</option>
          <option value="Room 3">Room 3</option>
          <option value="Room 4">Room 4</option>
        </select>

        <button
          className="btn btn-secondary"
          style={{ width: '100%', color: 'black' }}
          onClick={joinRoomHandler}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
