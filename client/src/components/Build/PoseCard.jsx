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
  Modal,
  CircularProgress
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
        fullWidth={true}
        PaperProps={{
          sx: {
            height: '55%'
          }
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Pose Tutorial"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ width: '100%', height: '100%' }}>
            <iframe src={`${thePose.demo}?autoplay=1`} style={{ width: '100%', height: '100%' }} allow="autoplay"/>
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
    <Grid item xs={12} sm={6} md={4}>
      <Card style={{ height: '100%' }}>
      <CardContent sx={{ flexDirection:"column", height: '100%', m:"auto" }}>
      <Grid container spacing={2} sx={{alignItems:"center", justifyContent:"center", height:"100%"}}>
        <Grid item xs={6}>
          <Box display="flex" sx={{alignItems:"center", justifyContent:"center"}}>
          {
            img.length ?
            <img src={img}
            style={{maxHeight: '100px', maxWidth: '100px'}}
            alt={thePose.name}
          />
          : <CircularProgress />
          }
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
