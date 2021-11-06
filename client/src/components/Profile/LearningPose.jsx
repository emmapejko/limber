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
import Tooltip from '@mui/material/Tooltip';
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

const LearningPose = (props) => {
  const [auto, setAuto] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [poses, setPoses] = useState([]);
  const [openPose, setOpenPose] = useState(false);

  // grab data from autocomplete
  const handleChange = (event, value) => setSelectedOptions(value);

  const handleSubmit = () => {
    axios.post('/profile/userPosesDontKnow', { data: selectedOptions })
      .then((response) => {
        getUserPosesId();
        setAuto(false);
      })
      .catch((err) => {
        console.warn(err, 'PoseKnown: handleSubmit error');
      });
  };

  const getUserPosesId = () => {
    axios.get('profile/userPosesWorkingOn')
      .then(({ data }) => {
        setPoses(data);
      })
      .catch((err) => {
        console.warn(err);
      });
  };
//added delete functionality
  const deleteByPoseId = (id) => {
    axios
      .delete(`/profile/userPosesWorkingOn/${id}`)
      .then(() => {
        getUserPosesId();
        setOpenPose(false);
      })
      .catch(err => {
        console.warn('Error Deleting');
      });
  }

  useEffect(() => {
    getUserPosesId();
  }, []);

  const lineBreak = {
    border: '1px solid #ffb627',
    borderRadius: '5px',
    marginTop: "0px"
}
const banner = {
  backgroundColor: '#F8F8FF'
}
  return (
    <div>
      <Box
        style={banner}
        display="flex"
        alignItems="center"
        justifyContent="center"
        m="auto"
      >
      <Button style={props.style} onClick={() => setOpenPose(true)}>What you're working on</Button>
      
      <Button onClick={() => setAuto(true)}><AddIcon /></Button>
      
      </Box>
      <hr style={lineBreak} />
      <Modal
        open={auto}
        onClose={() => setAuto(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={props.style}
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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        m="auto"
        padding='3px'
      >
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
       </Box>
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
          <Typography id='modal-modal-title' variant="h6" component="h2">Learning</Typography>
          <Button onClick={() => setAuto(true)}><AddIcon /></Button>
          </Box>
          <Grid container spacing={1}>
          {
            poses.length ? poses.map((pose, i) =>
              <Grid item xs={6} sm={3} key={i}>
                <Tooltip title="Delete">
                <Button 
                  sx={{ height: '100%'}} 
                  key={i} 
                  onClick={() => deleteByPoseId(pose.id)}>
                <PoseItem 
                 key={i}
                  pose={pose} 
                  style={props.style}
                />
                </Button>
                </Tooltip>
              </Grid>)
                : null
          }
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default LearningPose;