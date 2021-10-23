
import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import 'regenerator-runtime/runtime';
import Paper from '@mui/material/Paper';

import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Img = styled('img')({
  justifyContent: 'flex-start',
  margin: 0,
  display: 'block',
  maxWidth: 'flex',
  maxHeight: 'flex',
});

function Chat({ socket, username, room, profilePicture }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

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

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div>
      <div>
        <p>Live Chat</p>
      </div>
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
  );
}

export default Chat;
