import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import PoseItem from './PoseItem.jsx';

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

export default function LearningPose(props) {
  
  const [open, setOpen] = React.useState(false);
  const [auto, setAuto] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [poses, setPoses] = useState([]);

  // 1st open/close modal functions
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // autocomplete open/close functions
  const handleAuto = () => setAuto(true);
  const closeAuto = () => setAuto(false);

  // grab data from autocomplete
  const handleChange = (event, value) => setSelectedOptions(value);

  const handleSubmit = () => {
    axios.post('/profile/userPosesDontKnow', { data: selectedOptions })
      .then((response) => {
        getUserPosesId();
      })
      .catch((err) => {
        console.warn(err, 'PoseKnown: handleSubmit error');
      });
  };

  const getUserPosesId = () => {
    axios.get('profile/userPosesWorkingOn')
      .then(({ data }) => {
        
        setPoses(data);
        //setPoses((prev) => [...prev, data]);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  useEffect(() => {
    getUserPosesId();
  }, []);

  return (
    <div>

      <Button style={props.style}>What you're working on</Button>
      
    
      <Button onClick={handleAuto}><AddIcon /></Button>
      <Modal
        open={auto}
        onClose={closeAuto}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={props.style}
      >
        <Box sx={style}>

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={props.pose}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.name}
            onChange={handleChange}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} style={props.style}>

                {option.name}
              </Box>
            )}
            renderInput={(params) => <TextField {...params} name="Poses" />}
          />
          <Button onClick={handleSubmit}><AddIcon /></Button>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={props.style}>
            Add a Pose to your collection. Now.
          </Typography>
        </Box>
      </Modal>
      <div>
      <Grid container spacing={1}>
        {
          poses.length ? poses.map((pose, i) => <PoseItem key={i} pose={pose} style={props.style} />) : null
        }
       </Grid>
      </div>
    </div>
  );
}


