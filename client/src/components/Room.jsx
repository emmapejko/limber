import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client"
import Peer from 'peerjs';
import ScrollToBottom from 'react-scroll-to-bottom';
import 'regenerator-runtime/runtime';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const socket = io();

const MainVideos = styled('div')({
  flexGrow: '1',
  backgroundColor: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const Main = styled('div')({
  height: '500px',
  display: 'flex',

})

const MainRight = styled('div')({
  flex: '0.2',
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
        moment(currentMessage.createdAt).fromNow(),
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
  
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <Main>
      <MainLeft>
        <MainVideos>
          <div style={{
              display: 'flex',
              justifyContent: 'center',
              height: '100%',
              width: '100%',
              alignItems: 'center',
              flexWrap: 'wrap',
              overflowY: 'auto',
          }} ref={videoGrid} id="video-grid">
            <video style={{
              display: 'block',
              flex: '1',
              objectFit: 'cover',
              border: '5px solid #000',
              maxWidth: '600px',
              height: '300px',
              width: '400px',
              objectFit: 'cover',
              padding: '8px'
            }} ref={myVideo}></video>
            <video style={{
               display: 'block',
               flex: '1',
               objectFit: 'cover',
               border: '5px solid #000',
               maxWidth: '600px',
               height: '300px',
               width: '400px',
               objectFit: 'cover',
               padding: '8px'
            }} ref={Video2}></video>
           
          </div>
        </MainVideos>
      </MainLeft>
      <MainRight>
      <div style={{
          flexGrow: '1',
          overflowY: 'scroll',
          padding: '20px 20px 0 20px'
      }}>
    {messageList.map((messageContent, i) => {
      return (
        <div>
          
        <ul style={{
          flexGrow: '1px',
          overflowY: 'scroll',
          padding: '20px 20px 0 20px',
        }} 
          key={i}
          id={username === messageContent.author ? 'you' : 'other'}
        >
            <li style={{
          color: '#fff',
          listStyle: 'none',
          borderBottom: '1px solid #3d3d42',
          padding: '10px 0'
        }}>
            <div>
              <div>
                <img style={{
                  width:'100%',
                  maxWidth:'30px',
                  overflow: 'auto',
                  float: 'left',
                  borderRadius: '50px',
                 
                }} src={messageContent.profilePicture} />
              </div>
          <Typography>
                <div style={{
                  float: 'right'
                }}>{messageContent.message}</div>
            </Typography>
            <Typography>
              <div style={{ 
                fontSize: '12px',
              }} id="author">{messageContent.author}</div>
              </Typography>
              <Typography>
              <div style={{
                color: '#f5f5f5',
                fontSize: "10px",
                fontStyle: 'italic'
              }}id="time">{messageContent.time}</div>
              </Typography>
            </div>
          </li>

          {/* <Item>
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
          </Item> */}
          <AlwaysScrollToBottom />
        </ul>
        
        </div>
      );
    })}

  </div>
  <Typography>
    <input
    style={{
      flexGrow: '1',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#f5f5f5',
      userSelect: 'none',
      outline: 'none',
    }}
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
    </Typography>
    {/* <button  onClick={sendMessage}>&#9658;</button> */}
      </MainRight>
    </Main>
  )
}

export default Room;



    // <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    //   <ListItem alignItems="flex-start">
    //     <ListItemAvatar>
    //       <Avatar alt={messageContent.author} src={messageContent.profilePicture} />
    //     </ListItemAvatar>
    //     <ListItemText
    //       primary="Brunch this weekend?"
    //       secondary={
    //         <React.Fragment>
    //           <Typography
    //             sx={{ display: 'inline' }}
    //             component="span"
    //             variant="body2"
    //             color="text.primary"
    //           >
    //             Ali Connors
    //           </Typography>
    //           {messageContent.message}
    //         </React.Fragment>
    //       }
    //     />