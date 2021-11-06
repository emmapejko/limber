import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client"
import Peer from 'peerjs';
import 'regenerator-runtime/runtime';
import {
  Grid, 
  List, 
  Avatar,
  Divider, 
  ListItem,
  Typography, 
  ListItemText, 
  ListItemAvatar, 
} from '@mui/material';
import moment from 'moment';

const socket = io();





const Room = ({username, room, profilePicture}) => {
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
              }} ref={myVideo}></video>
             <video style={{
               display: 'block',
               backgroundColor: 'black',
               flex: '1',
               objectFit: 'cover',
               border: '20px solid #000',
               maxWidth: '600px',
               height: '300px',
               width: '400px',
               objectFit: 'cover',
            }} ref={Video2}></video>
            {/* </div> */}
          </Grid>
       
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
        
            style={{
            flexGrow: '1',
            overflowX: 'auto',
            // height: '100%',
            backgroundColor: '#242324',
            borderLeft: '1px solid #3d3d42',
            minHeight: '340px',
            maxHeight : '340px',
        }}>
        <List style={{
            flexGrow: '1',
            overflow: 'auto',
            padding: '10px 10px 0px 10px',
          }} >
      {messageList.map((messageContent, i) => {
        return (
          <><ListItem style={{
            alignItems: 'flexStart',
            color: '#fff',
            listStyle: 'none',
            borderBottom: '1px solid #3d3d42',
            padding: '10px 0'
          }}
            key={i}>
            <ListItemAvatar>
              <Avatar alt={messageContent.author} src={messageContent.profilePicture} />
            </ListItemAvatar>
            <ListItemText
              primary={messageContent.author}
              secondary={<React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="whitesmoke"
                >
              
                {`${messageContent.message}`}
                </Typography>
              </React.Fragment>} />
          </ListItem><Divider variant="inset" component="li" /></>
        );
      })}
      </List>
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



