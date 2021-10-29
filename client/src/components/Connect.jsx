import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Room from './Room.jsx';
const socket = io('/');

import FollowersList from './FollowersList.jsx';
import TeacherFlowsList from './TeacherFlowsList.jsx';

function Connect(props) {

  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('LIMBER');
  const [showChat, setShowChat] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
  const [user, setUser] = useState({});

  const setFullName = () => {
    axios
      .get('/chat/full_name')
      .then((res) => {
        setUsername(res.data.full_name);
        setProfilePicture(res.data.picture);
        setUser(res.data);
      })
      .catch((err) => console.warn(err))
  }

  const joinRoom = () => {
    setShowChat(true);
  };

  useEffect(() => {
    setFullName();
  }, [])

  return (
    <div className="App">
      {!showChat ? 
        <div className="joinChatContainer">
          <h3>LIMBER CHAT</h3>
          <button onClick={() => { joinRoom() }}>Join Chat</button>
        </div>
      :
      <Room socket={socket} username={username} room={room} profilePicture={profilePicture} />
        }
      <div>
        <FollowersList user={user} />
      </div>
      <div>
        <TeacherFlowsList />
      </div>
    </div>
  );
}
export default Connect;



