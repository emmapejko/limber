import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PoseCard from './PoseCard.jsx';
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


//pass whatIsKnown props into PoseKnown function

export default function PoseKnown({ pose }) {
  console.log('pose:', pose);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleAuto = () => setOpen(true);
  const handleClose = () => setOpen(false);

  

  return (
    <div>
     
      <Button onClick={handleOpen}>What you know...</Button>
      {/* <div>{pose.map(poses => <div>{poses.name}</div>)}</div> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Poses rendered for selection.
          </Typography>
        </Box>
      </Modal>
      <Button onClick={handleAuto}><AddIcon /></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2"> */}
          <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={pose}
      sx={{ width: 300 }}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
         
          {option.name}
        </Box>
      )}
      renderInput={(params) => <TextField {...params} name="Poses" />}
    />
          {/* </Typography> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Poses rendered for selection.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}



