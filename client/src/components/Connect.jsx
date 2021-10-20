import React,{ useState } from 'react';
import io from 'socket.io-client';
import Chat from "./Chat.jsx";


const socket = io.connect("http://localhost:3000");



function Connect () {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
 
      socket.emit("join_room");
      setShowChat(true);
  
  };

  return (
    <div>
      {!showChat ? (
        <div >
          <h3>Join A Chat</h3>
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





