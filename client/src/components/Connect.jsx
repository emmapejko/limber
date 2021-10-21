import React,{ useState, useEffect } from 'react';
import io from 'socket.io-client';
import Chat from "./Chat.jsx";
import axios from 'axios';
const socket = io.connect("http://localhost:3000");



function Connect () {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

  const setFullName = () => {
    axios
    .get('/chat/full_name')
    .then((res) => {
        console.log('THIS IS SETFULLNAME RES', res);
        setUsername(res.data.full_name);
      })
    .catch(err => console.error(err))
  }
  
  const joinRoom = () => {
    
      setRoom('LIMBER CHAT')
      socket.emit("join_room");
      setFullName();
      setShowChat(true);
  
  };

  useEffect(() => {
    setFullName();

  },[])

  return (
    <div>
      {!showChat ? (
        <div >
          <h3>LIMBER CHAT</h3>
          {/* <input
            type="text"
            placeholder="name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          /> */}
          {/* <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          /> */}
          <button onClick={joinRoom}>Join Chat</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}
export default Connect;





