import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import socketio from 'socket.io-client';

import Dashboard from './components/Dashboard';
import ChatRoom from './components/ChatRoom';

const socket = socketio.connect('http://localhost:5000/');

function App() {
  const [username, setUsername] = useState('');
  const [selectedroom, setSelectedRoom] = useState('');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                username={username}
                selectedroom={selectedroom}
                setUsername={setUsername}
                setSelectedRoom={setSelectedRoom}
                socket={socket}
              />
            }
          />

          <Route
            path="/chatroom"
            element={
              <ChatRoom
                username={username}
                selectedroom={selectedroom}
                socket={socket}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
