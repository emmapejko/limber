import React, { useState, useEffect } from "react";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Autocomplete from "@mui/material/Autocomplete";
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const PoseCard = ({ pose }) => {
  const [thePose, setThePose] = useState(pose);
  const [img, setImg] = useState('');
  const [demoOpen, setDemoOpen] = useState(false);
  const [poses, setPoses] = useState([]);
  const [posesOpen, setPosesOpen] = useState(false);
  const [switchPose, setSwitchPose] = useState('');

  const getPoseImage = () => {
    axios.get(`/images/${thePose.name.split(' ').join('')}`)
      .then(({ data }) => {
        //console.log(data);
        setImg(data);
        getAllPoses();
      })
      .catch(err => {
        console.error('error getting image: ', err);
      })
  }

  const getAllPoses = () => {
    axios.get('/profile/allPoses')
    .then(({ data }) => {
      setPoses(data);
    })
    .catch(err => {
      console.error('error getting poses: ', err);
    });
  }

  useEffect(() => {
    getPoseImage();
  }, [thePose]);

  const switchThePose = () => {
    setThePose(switchPose);
    setPosesOpen(false);
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
      <Dialog
        open={posesOpen}
        onClose={() => setPosesOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{height: '600px'}}
      >
        <DialogTitle id="alert-dialog-title">
          {"Select a new pose"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
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
              <Button onClick={switchThePose}>Switch</Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Grid item xs={4}>
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
          <Typography gutterBottom variant="h5" component="div">
            {thePose.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {thePose.sanskrit}
          </Typography>
        </Grid>
      </Grid>
      </CardContent>
    </Card>
    {demoDialog()}
    {poseDialog()}
    </Grid>
  )
}

export default PoseCard;