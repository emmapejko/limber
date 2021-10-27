import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

function DashBoard(props) {
  const [open, setOpen] = React.useState(false);
  const [level, setLevel] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
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
        
        setLevel(slicedRank);
      })
      .catch((err) => {
        console.warn(err, 'getUserPosesKnown');
      });
  };

  useEffect(() => {
    getUserPosesKnown();
  }, []);

  return (
    <div>
      <Button onClick={handleOpen} style={props.style}>DashBoard</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <DashTable style={props.style}/>
          </Typography>
          <Typography 
          id="modal-modal-description" 
          sx={{ mt: 2 }}
          style={props.style}
          >
            Skill Level: {level}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default DashBoard;
