import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client"
import Peer from 'peerjs';
import axios from "axios";
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import 'regenerator-runtime/runtime';
import Chat from "./Chat.jsx"
const socket = io('/videoChat');
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
// const videoGrid = React.getElementById("video-grid")
// const myVideo = document.createElement('video')

var peer = new Peer(undefined, {
  path: '/peerjs',
  host:'/videoChat',
  port: "3000",
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const Img = styled('img')({
  justifyContent: 'flex-start',
  margin: 0,
  display: 'block',
  maxWidth: 'flex',
  maxHeight: 'flex',
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










function Room(username, room, profilePicture) {
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
  
  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room,
        author: username,
        profilePicture,
        message: currentMessage,
        time:
          `${new Date(Date.now()).getHours()
          }:${
            new Date(Date.now()).getMinutes()}`,
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };
  
  
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
          <div ref={videoGrid} id="video-grid">
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
      <div>
    
    {messageList.map((messageContent, i) => {
      console.log(messageContent);
      return (
        <div
          id={username === messageContent.author ? 'you' : 'other'}
        >
          <Item>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item xs>
                <Img src={messageContent.profilePicture} />
              </Grid>
              <Grid item xs>
                <Typography noWrap variant="body2" component="div">{messageContent.message}</Typography>
              </Grid>          
              <Typography id="author">{messageContent.author}</Typography>
              <div id="time">{messageContent.time}</div>
               
            </Grid>
          </Item>
        </div>
      );
    })}
  
  </div>
  <div>
    <input
      type="text"
      value={currentMessage}
      placeholder="Hey..."
      onChange={(event) => {
        setCurrentMessage(event.target.value);
      }}
      onKeyPress={(event) => {
        event.key === 'Enter' && sendMessage();
      }}
    />
    <button onClick={sendMessage}>&#9658;</button>
  </div>
      </div>
    </div>
  )
}

export default Room;
// const scrollToBottom = () => {
//   let d = $('.main__chat__window');
//   d.scrollTop(d.prop("scrollHeight"));

// }

