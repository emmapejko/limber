import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client"
import Peer from 'peerjs';
import axios from "axios";
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import 'regenerator-runtime/runtime';
import Chat from "./Chat.jsx"
const socket = io('/videoChat');

// const videoGrid = React.getElementById("video-grid")
// const myVideo = document.createElement('video')

var peer = new Peer(undefined, {
  path: '/peerjs',
  host:'/videoChat',
  port: "3000",
});




const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if(enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
    }
  };

  const setMuteButton = () => {
    const html = `<i></i>
    <span>Mute</span>`
    document.querySelector('.main__mute_button').innerHTML = html;
  }

  const setUnmuteButton = () => {
    const html = `<i></i>
    <span>Unmute</span>`
    document.querySelector('.main__mute_button').innerHTML = html;
  }

const playStop = () => {
  let enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    setPlayVideo()
  } else {
    setStopVideo()
    myVideoStream.getVideoTracks()[0].enabled = true;
  }
}

const setStopVideo = () => {
  const html = `<i></i><span>Stop Video</span>`
  document.querySelector('.main__video_button').innerHTML = html;
}

const setPlayVideo = () => {
  const html = `<i></i><span>Play Video</span>`
  document.querySelector('.main__video_button').innerHTML = html;
}










function Room(socket, username, room, profilePicture) {
  const roomId = 666;
  const videoGrid = useRef();
  const myVideo = useRef();
  const messages = useRef(new Array());
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const { path, url } = useRouteMatch();
  
  //VIDEO functions

  const connectToNewUser = (userId, stream) => {
      const call = peer.call(userId, stream)
     
      call.on('stream', userVideoStream => {
        addVideoStream(myVideo, userVideoStream);
      })
    }

  let myVideoStream;
  
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  }).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo.current, stream);
    
    // peer.on('call', call => {
    //   call.answer(stream)
    //   const video = document.createElement('video')
    //   call.on('stream', userVideoStream => {
    //     addVideoStream(video, userVideoStream);
    //   })
    // })
    
    socket.on('user-connected', (userId) => {
      connectToNewUser(userId, stream)
    })
  })
  
  peer.on('open', id => {
    socket.emit('join-room', roomId, id);
  })
  
  const addVideoStream = (video, stream) => {
   
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    
  } 
  
  
  
  //TEXT FUNCTIONS

  // let text = $("input");
  // // when press enter send message
  // $('html').keydown(e => {
  //   if (e.which == 13 && text.val().length !== 0) {
  //     console.log(text.val())
  //     socket.emit('message', text.val());
  //     text.val('')
  //   }
  // });
  
  // socket.on('createMessage', message => {
  //   console.log("this is createMessage:", message)
  //   messages.current.push(`<li className="message"><img src="https://lh3.googleusercontent.com/a-/AOh14GjRMxq0Sc0NMfDaIJyw7ATUh82nZ-qvv-z_ISaDuqo=s96-c"></img><b>Luke Johnson</b><br/>${message}</li>`)
  //   // $('.messages').append(`<li className="message"><img src="https://lh3.googleusercontent.com/a-/AOh14GjRMxq0Sc0NMfDaIJyw7ATUh82nZ-qvv-z_ISaDuqo=s96-c"></img><b>Luke Johnson</b><br/>${message}</li>`)
  //   // scrollToBottom();
  // })
  
  useEffect(() => {
  }, [])

  return (
    <div className="main">
      <div className="main__left">
        <div className="main__videos">
          <div ref={videoGrid} id="video-grid">video
            <video ref={myVideo}></video>
          </div>
        </div>
        <div className="main__controls">
          <div className="main__controls_block">
            <div className="main__controls_button main__mute_button" id="muteButton" /*onClick={muteUnmute}*/>
              <i></i>
              <span>Mute</span>
            </div>
            <div className="main__controls_button main__video_button" id="playPauseVideo" /*onClick={playStop}*/>
              <i></i>
              <span>Pause Video</span>
            </div>
          </div>

          <div className="main__controls_block">

            <div className="main__controls_button">
             
            </div>
          </div>

          <div className="main__controls_block">
      
          </div>
        </div>
      </div>
   
      <div className="main__right">
      <Chat />
      </div>
    </div>
  )
}

export default Room;
// const scrollToBottom = () => {
//   let d = $('.main__chat__window');
//   d.scrollTop(d.prop("scrollHeight"));

// }

