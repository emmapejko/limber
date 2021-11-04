import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import Room from './Room.jsx';
import FollowersList from './FollowersList.jsx';
import TeacherFlowsList from './TeacherFlowsList.jsx';

const Connect = (props) => {
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
          <Button variant="contained" onClick={() => { joinRoom() }}>Join Chat</Button>
        </div>
      :
      <Room username={username} room={room} profilePicture={profilePicture} />
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



