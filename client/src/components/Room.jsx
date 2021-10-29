import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client"
import Peer from 'peerjs';
import axios from "axios";
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import 'regenerator-runtime/runtime';
const socket = io('/videoChat');
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';


var peer = new Peer(undefined, {
 
  host:'/',
  port: "3001",
});

const MainVideos = styled('div')({
  flexGrow: '1',
  backgroundColor: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

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
const Main = styled('div')({
  height: '100%',
  display: 'flex',
})

const MainRight = styled('div')({
  flex: 0.2,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#242324',
  borderLeft: '1px solid #3d3d42'
})

const MainLeft = styled('div')({
  flex: '0.8',
  display: 'flex',
  flexDirection: 'column'
})

const MessageInput = styled('div')({
  flexGrow: '100',
  backgroundColor: 'transparent',
  border: 'none',
  color: '#f5f5f',
  userSelect: 'none',
  outline: 'none'
})



function Room({username, room, profilePicture}) {
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
  
  peer.on('open', id => {
    socket.emit('join-room', roomId, id);
  })
  
  const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    // videoGrid.current.append(video);
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

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    }).then(stream => {
      myVideoStream = stream;
      // console.log('this is myVideoStream:', navigator.mediaDevices)
      addVideoStream(myVideo.current, stream);
      
      peer.on('call', call => {
        call.answer(stream)
  
        call.on('stream', userVideoStream => {
          addVideoStream(myVideo, userVideoStream);
        })
      })
      
      socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream)
      })
    })
  }, [])

  return (
    <Main>
      <MainLeft>
        <MainVideos>
          <div ref={videoGrid} id="video-grid">
            <video ref={myVideo}></video>
            

          </div>
        </MainVideos>
 
      </MainLeft>
   
      <MainRight>
      <div>
    
    {messageList.map((messageContent, i) => {
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
  <MessageInput>
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
  </MessageInput>
      </MainRight>
    </Main>
  )
}

export default Room;
// const scrollToBottom = () => {
//   let d = $('.main__chat__window');
//   d.scrollTop(d.prop("scrollHeight"));

// }

