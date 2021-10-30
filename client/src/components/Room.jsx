import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client"
import Peer from 'peerjs';
import ScrollToBottom from 'react-scroll-to-bottom';
import 'regenerator-runtime/runtime';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const socket = io();

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
  const roomId = 'LIMBER';
  const videoGrid = useRef();
  const myVideo = useRef();
  const Video2 = useRef();
  const Video3 = useRef();
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const [stream, setStream] = useState({});
  const [stream2, setStream2] = useState({});
  const [stream3, setStream3] = useState({});
  const [count, setCount] = useState(2);

  const currentStream = useRef();

  const peer = useRef(new Peer(undefined, {
      path: '/peerjs',
      host:'/',
      port: "3000",
  }));

  const connectToNewUser = async (userId, stream) => {
      const call = peer.current.call(userId, currentStream.current);
      call.on('stream', userVideoStream => {
          addVideoStream(Video2.current, userVideoStream);
          setStream2(userVideoStream);
      })
  };

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
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    peer.current.on('open', id => {
      socket.emit('join-room', roomId, id);
    });

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    }).then(stream => {
      setStream(stream);
      currentStream.current = stream;
      addVideoStream(myVideo.current, stream);

      socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream)
      })

    })

    socket.on('createMessage', message => {
      setMessageList((list) => [...list, message]);
    })

    // peer.current.on('call', call => {
    //   call.answer(currentStream.current);
    //   call.on('stream', st => {
    //     addVideoStream(Video2.current, st);
    //     setStream2(st);
    //   })
    // })
  }, []);

  useEffect(() => {
    peer.current.on('call', call => {
      call.answer(currentStream.current);
      call.on('stream', st => {
          addVideoStream(Video2.current, st);
          setStream2(st);
      })
    })
  }, [stream2, stream3]);

  return (
    <Main>
      <MainLeft>
        <MainVideos>
          <div ref={videoGrid} id="video-grid">
            <video ref={myVideo}></video>
            <video ref={Video2}></video>
            <video ref={Video3}></video>
          </div>
        </MainVideos>
      </MainLeft>
      <MainRight>
      <div>

    {messageList.map((messageContent, i) => {
      return (
        <div
          key={i}
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


