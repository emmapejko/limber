import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client"
import Peer from 'peerjs';
import ScrollToBottom from 'react-scroll-to-bottom';
import 'regenerator-runtime/runtime';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import moment from 'moment';

const socket = io();





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

  const scrollToBottom = () => {
    messageList.current.scrollIntoView({ behavior: "smooth" })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messageList])

  useEffect(() => {
    peer.current.on('call', call => {
      call.answer(currentStream.current);
      call.on('stream', st => {
          addVideoStream(Video2.current, st);
          setStream2(st);
      })
    })
  }, [stream2, stream3]);
  
  // const AlwaysScrollToBottom = () => {
  //   const elementRef = useRef();
  //   useEffect(() => elementRef.current.scrollIntoView());
  //   return <div ref={elementRef} />;
  // };

  return (
        <Grid container>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
      
          <Grid item style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                alignItems: 'center',
                flexWrap: 'wrap',
                overflowY: 'auto',
                flexDirection: 'row',
            }} ef={videoGrid} id="video-grid">
            {/* <div ref={videoGrid} id="video-grid"> */}
              <video style={{
                display: 'block',
                flex: '1',
                objectFit: 'cover',
                border: '20px solid #000',
                maxWidth: '600px',
                height: '300px',
                width: '400px',
                objectFit: 'cover',
                // padding: '8px'
              }} ref={myVideo}></video>
             <video style={{
               display: 'block',
               flex: '1',
               objectFit: 'cover',
               border: '20px solid #000',
               maxWidth: '600px',
               height: '300px',
               width: '400px',
               objectFit: 'cover',
              //  padding: '8px'
            }} ref={Video2}></video>
            {/* </div> */}
          </Grid>
       
        </Grid>
        
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
            style={{
            flexGrow: '1',
            overflowY: 'auto',
            // height: '100%',
            backgroundColor: '#242324',
            borderLeft: '1px solid #3d3d42',
            minHeight: '340px',
            maxHeight : '340px',
            // flexDirection: 'row'
        }}>
        
      {messageList.map((messageContent, i) => {
        return (
          <Grid item>
            
          <ul style={{
            flexGrow: '1',
            overflow: 'auto',
            padding: '10px 10px 0px 10px',
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
            <Typography style={{
                    float: 'right'
                  }}>
                  {messageContent.message}
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
            
          </ul>
          
           </Grid>
        );
      })}
 <div ref={messageList} />
   
    <Grid item xs={12} sm={12} item md={4} lg={4} xl={4} container
    style={{flexDirection: 'row'}}>
      
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
      </Grid>
  
        </Grid>
        </Grid>
  );
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