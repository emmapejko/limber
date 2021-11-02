import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Dialog,
  Autocomplete,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Modal
} from '@mui/material';

const PoseCard = ({ pose, i, changeFlow }, props) => {
  const [thePose, setThePose] = useState(pose);
  const [img, setImg] = useState('');
  const [demoOpen, setDemoOpen] = useState(false);
  const [poses, setPoses] = useState([]);
  const [posesOpen, setPosesOpen] = useState(false);
  const [switchPose, setSwitchPose] = useState('');

  const getPoseImage = () => {
    axios.get(`/images/${thePose.name.split(' ').join('')}`)
      .then(({ data }) => {
        setImg(data);
        getAllPoses();
      })
      .catch(err => {
        console.warn('error getting image: ', err);
      })
  }

  const getAllPoses = () => {
    axios.get('/profile/allPoses')
    .then(({ data }) => {
      setPoses(data);
    })
    .catch(err => {
      console.warn('error getting poses: ', err);
    });
  }

  useEffect(() => {
    getPoseImage();
  }, [thePose]);

  const switchThePose = () => {
    setThePose(switchPose);
    setPosesOpen(false);
    changeFlow(i, switchPose);
  }

  const demoDialog = () => {
    return (
      <Dialog
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Pose Tutorial"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <iframe src={`${thePose.demo}?autoplay=1`} style={{height:'400px', width:'550px'}} allow="autoplay"/>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    )
  }

  const poseDialog = () => {
    return (
      <div>
      <Modal
        open={posesOpen}
        onClose={() => setPosesOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ justifyContent:'center' }}
      >
        <Box
          sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
          }}>
          <Typography id='modal-modal-title' variant="h6" component="h2">Select a new pose</Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={poses}
                sx={{ width: 300 }}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => setSwitchPose(value)}
                renderOption={(props, option) => (
                  <Box sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.name}
                  </Box>
                )}
                  renderInput={(params) => <TextField {...params} name="Poses" />}
              />
              <Button onClick={switchThePose} sx={{ marginLeft: '220px' }}>Switch</Button>
        </Box>
      </Modal>
      </div>
    )
  }

  return (
    <Grid item xs={12} sm={4}>
      <Card>
      <CardContent style={{padding: '10px'}} sx={{flexDirection:"column"}}>
      <Grid container spacing={2} sx={{alignItems:"center", justifyContent:"center"}}>
        <Grid item xs={6}>
          <Box display="flex" sx={{alignItems:"center", justifyContent:"center"}}>
          <img src={img}
            style={{maxHeight: '100px', maxWidth: '100px'}}
            alt={thePose.name}
          />
          </Box>
          <CardActions sx={{alignItems:"center", justifyContent:"center"}}>
            <Button size="small" onClick={() => setDemoOpen(true)}>Demo</Button>
            <Button size="small" onClick={() => setPosesOpen(true)}>Switch</Button>
          </CardActions>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom variant="h5" component="div" style={props.style}>
            {thePose.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={props.style}>
            {thePose.sanskrit}
          </Typography>
        </Grid>
      </Grid>
      </CardContent>
    </Card>
    {demoDialog()}
    {poseDialog()}
    </Grid>
  );
};

export default PoseCard;
