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
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const PoseCard = ({ pose }) => {
  const [img, setImg] = useState('');
  const [open, setOpen] = React.useState(false);

  const getPoseImage = () => {
    axios.get(`/images/${pose.name.split(' ').join('')}`)
      .then(({ data }) => {
        //console.log(data);
        setImg(data);
      })
  }

  useEffect(() => {
    getPoseImage();
  }, []);

  const demoDialog = () => {
    return (
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Pose Tutorial"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <iframe src={pose.demo} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} autoFocus>
            Close
          </Button>
        </DialogActions>
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
            alt={pose.name}
          />
          </Box>
          <CardActions sx={{alignItems:"center", justifyContent:"center"}}>
            <Button size="small" onClick={() => setOpen(true)}>Demo</Button>
            <Button size="small">Switch</Button>
          </CardActions>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom variant="h5" component="div">
            {pose.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pose.sanskrit}
          </Typography>
        </Grid>
      </Grid>
      </CardContent>
    </Card>
    {demoDialog()}
    </Grid>
  )
}

export default PoseCard;