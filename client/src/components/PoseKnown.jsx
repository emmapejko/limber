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
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PoseKnown({ pose }) {
  
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
    console.log(selectedOptions);

    axios.post('/profile/userPoses', { data: selectedOptions })
      .then((response) => {
        getUserPosesId();
      })
      .catch((err) => {
        console.log(err, 'PoseKnown: handleSubmit error');
      });
  };

  const getUserPosesId = () => {
    axios.get('profile/userPosesKnown')
      .then(({ data }) => {
        console.log('userPosesKnown:', data);
        setPoses(data);
      })
      .catch((err) => {
        console.log(err, 'getUserPosesKnown');
      });
  };

  useEffect(() => {
    getUserPosesId();
  }, []);

  return (
    <div>
      <Button>What you know...</Button>
      <Button onClick={handleAuto}><AddIcon /></Button>
      <Modal
        open={auto}
        onClose={closeAuto}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={pose}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.name}
            onChange={handleChange}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

                {option.name}
              </Box>
            )}
            renderInput={(params) => <TextField {...params} name="Poses" />}
          />
          <Button onClick={handleSubmit}><AddIcon /></Button>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Add a Pose to your collection. Now.
          </Typography>
        </Box>
      </Modal>
      <div>
      <Grid container spacing={1}>
        {
          poses.map((pose, i) => <PoseItem key={i} pose={pose} />)
        }
       </Grid>
      </div>
    </div>
  );
}
