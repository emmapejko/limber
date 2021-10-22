/* eslint-disable import/extensions */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Chat from './Chat.jsx';
const socket = io.connect('http://localhost:3000');



function Connect() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('LIMBER');
  const [showChat, setShowChat] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');

  const setFullName = () => {
    axios
      .get('/chat/full_name')
      .then((res) => {
        setUsername(res.data.full_name);
        setProfilePicture(res.data.picture);
      })
      .catch((err) => console.error(err))
  }
  
  const joinRoom = () => {
    socket.emit('join_room', room);
    setShowChat(true);
  };

  useEffect(() => {
    setFullName();
  }, [])

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>LIMBER CHAT</h3>
          <button onClick={() => { joinRoom() }}>Join Chat</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} profilePicture={profilePicture} />
      )}
    </div>
  );
}
export default Connect;
