
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Chat from './Chat.jsx';
import Room from './Room.jsx';
import {
  Switch, Route, Link, useRouteMatch,
} from 'react-router-dom';
const socket = io.connect('http://localhost:3000');



function Connect() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('LIMBER');
  const [showChat, setShowChat] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');

  const { path, url } = useRouteMatch();

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
    socket.emit('join_room', roomId);
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
          <button><Link to={`${url}/videoChat`}>Limber Live</Link>
      </button>
      <Switch>
        <Route path={`${path}/videoChat`}>
          <Room />
        </Route>
      </Switch>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} profilePicture={profilePicture} />
      )}
    </div>
  );
}
export default Connect;
