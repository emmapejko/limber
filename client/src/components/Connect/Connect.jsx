import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import Room from './Room.jsx';
import FollowersList from './FollowersList.jsx';
import TeacherFlowsList from './TeacherFlowsList.jsx';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

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
          <Typography><h3>LIMBER LIVE</h3></Typography>
          <Button variant="contained" onClick={() => { joinRoom() }}>Join Chat</Button>
        </div>
      :
      <Room username={username} room={room} profilePicture={profilePicture} />
        }
        <Grid style={{maxHeight:'30%'}} container >
        
      <Grid style={{maxHeight:'100%'}} item xs={12} sm={4} >
        <FollowersList user={user} />
      </Grid>
      <Grid style={{maxHeight:'100%'}} item xs={12} sm={8}>
        <TeacherFlowsList/>
      </Grid>
         
        </Grid>
    
    </div>
  );
}
export default Connect;



