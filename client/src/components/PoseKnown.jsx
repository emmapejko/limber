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

const PoseKnown = (props) => {
  const [auto, setAuto] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [poses, setPoses] = useState([]);
  const [openPose, setOpenPose] = useState(false);

  // grab data from autocomplete
  const handleChange = (event, value) => setSelectedOptions(value);

  const handleSubmit = () => {
    axios.post('/profile/userPoses', { data: selectedOptions })
      .then((response) => {
        getUserPosesKnown();
        setAuto(false);
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

  //added delete functionality
  const deleteByPoseId = (id) => {
    axios
      .delete(`/profile/userPosesWorkingOn/${id}`)
      .then(() => {
        getUserPosesKnown();
        setOpenPose(false);
      })
      .catch(err => {
        console.warn('Error Deleting');
      });
  }

  useEffect(() => {
    getUserPosesKnown();
  }, []);

 
  const header = {
    backgroundColor: '#fff8e1'
  }

  return (
    <div>
      <Box
        style={header}
        display="flex"
        alignItems="center"
        justifyContent="center"
        m="auto"
      >
      <Button style={props.style} onClick={() => setOpenPose(true)}>What you know</Button>
      <Button onClick={() => setAuto(true)}><AddIcon /></Button>
      </Box>
      <Modal
        open={auto}
        onClose={() => setAuto(false)}
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
      <Grid container spacing={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        m="auto"
      >
        {
          poses.length ? poses.map((pose, i) => (
            (i < 5) ?
            <PoseItem key={i} pose={pose} style={props.style} />
            : null)) : null
        }
       </Grid>
      </div>
      <Modal
        open={openPose}
        onClose={() => setOpenPose(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}  style={{ width: '40%', maxHeight: '60%', overflow: 'scroll'}}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            m="auto"
          >
          <Typography id='modal-modal-title' variant="h6" component="h2">Know</Typography>
          <Button onClick={() => setAuto(true)}><AddIcon /></Button>
          </Box>
          <Grid container spacing={1}>
          {
            poses.length ? poses.map((pose, i) =>
              <Grid item xs={6} sm={3}>
                <Button title="click here to delete" onClick={() => deleteByPoseId(pose.id)}>
                <PoseItem key={i} pose={pose} style={props.style} />
                </Button>
                </Grid>) : null
          }
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default PoseKnown;

