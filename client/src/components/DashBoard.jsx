import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { List, ListItem, ListItemText, Chip } from '@mui/material';
import DashTable from './DashTable.jsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DashBoard = (props) => {
 
  const [open, setOpen] = React.useState(false);
  const [level, setLevel] = useState([]);
  const [known, setKnown] = useState([]);
  const [learn, setLearn] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  //refactor this so dashboard logic is outside of the axios request
  const getUserPosesKnown = () => {
    axios.get('profile/userPosesKnown')
      .then(({ data }) => {
        
        const skillObj = {};
        let skillz = [];

        data.forEach((item, i) => {
          skillObj[item.difficulty] = (skillObj[item.difficulty] || 0) + 1;
        })
        
      skillz = Object.entries(skillObj);
     
      skillz.sort((a, b) => b[1] - a[1]);
      const slicedRank = skillz[0].slice(0, 1);
        setKnown(data.length);
        setLevel(slicedRank);
      })
      .catch((err) => {
        console.warn(err, 'getUserPosesKnown');
      });
  };

  const getUserPosesId = () => {
    axios.get('profile/userPosesWorkingOn')
      .then(({ data }) => {
        
        setLearn(data.length);
        //setPoses((prev) => [...prev, data]);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  

  useEffect(() => {
    getUserPosesKnown();
    getUserPosesId();
  }, []);
  const lineBreak = {
    border: '1px solid #ffb627',
    borderRadius: '5px',
}
const banner = {
  backgroundColor: '#F8F8FF'
}

  return (
    <div style={banner}> 
      <Button onClick={handleOpen} style={props.style}>DashBoard</Button>
      <hr style={lineBreak} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        //style={{width: '40%', height: '90%'}}
      >
        <Box sx={style}>
          <Grid id="modal-modal-title" variant="h6" component="h2">
            <DashTable style={props.style} />
          </Grid>
          <Grid 
          id="modal-modal-description" 
          sx={{ mt: 2}}
          style={props.style}
          >
           
            <Box
             display="flex"
             alignItems="center"
             justifyContent="center"
             m="auto"
            >
            <Typography>
            Skill Level: 
            <Chip 
            label={level}
            edge="end"
            size="small" 
            color={level === 'beginner' ? 'secondary' : level === 'intermediate' ? 'primary' : 'success'}
            />
            </Typography>
            </Box>
            <Box
             display="flex"
             alignItems="center"
             justifyContent="center"
             m="auto"
            >
            <Typography>
            # of poses mastered: {known}
            </Typography>
            </Box>
            <Box
             display="flex"
             alignItems="center"
             justifyContent="center"
             m="auto"
            >
            <Typography>
            poses still learning: {learn}
            </Typography>
            </Box>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default DashBoard;
