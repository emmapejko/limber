import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import PoseItem from './PoseItem.jsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PoseKnown(props) {
 
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
    axios.post('/profile/userPoses', { data: selectedOptions })
      .then((response) => {
        getUserPosesKnown();
      })
      .catch((err) => {
        console.warn(err, 'PoseKnown: handleSubmit error');
      });
  };

  const getUserPosesKnown = () => {
    axios.get('profile/userPosesKnown')
      .then(({ data }) => {
        setPoses(data);
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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        m="auto"
      >
      <Typography style={props.style}><h4>What you know</h4></Typography>
      <Button onClick={handleAuto}><AddIcon /></Button>
      </Box>
      <Modal
        open={auto}
        onClose={closeAuto}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant="h6" component="h2">Add a new pose</Typography>
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
          <Button onClick={handleSubmit} sx={{ marginLeft: '250px' }}><AddIcon /></Button>
        </Box>
      </Modal>
      <div>
      <Grid container spacing={1} style={props.style}>
        {
          poses.length ? poses.map((pose, i) => <PoseItem key={i} pose={pose} style={props.style}/>) : null
        }
       </Grid>
      </div>
    </div>
  );
}
