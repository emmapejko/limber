import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import skelly from '../images/skellyton.png';
import PoseCard from './PoseCard.jsx';

const BuildSetUp = ({ jobBodyParts }) => {
  const [length, setLength] = useState('');
  const [bodyParts, setBodyParts] = useState(jobBodyParts);
  const [openDialog, setOpenDialog] = useState(false);
  const [flow, setFlow] = useState([]);
  const [openSave, setOpenSave] = useState(false);
  const [flowName, setFlowName] = useState('');

  const handleClick = (part) => {
    setBodyParts(prev => [...new Set([...prev, part])]);
  }

  const removePart = (part) => {
    setBodyParts(bodyParts.filter((el) => el !== part));
  }

  const build = () => {
    console.log(`building a ${length} flow focusing on ${bodyParts.join(' and ')}`);
    const data = {
      length: length,
      bodyParts: bodyParts
    }
    axios.post('/flow', { data: data })
      .then(({ data }) => {
        console.log(data);
        setFlow(data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  const changeFlow = (i, newPose) => {
    const newFlow = [...flow];
    newFlow.splice(i, 1, newPose);
    setFlow(newFlow);
  }

  const saveFlow = () => {
    setOpenSave(false);
    console.log(`SAVING ${flowName}`, flow);
    const data = {
      flowName: flowName,
      flow: flow,
      length: length
    }
    axios.post('/flow/saveFlow', { data: data})
      .then(() => {
        console.log('done saving');
      })
      .catch(err => {
        console.error(err);
      })
  }

  return (
    <>
    { !flow.length ?
      <>
      <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      m="auto"
      >
        <Box sx={{ minWidth: 120, marginTop: '5px', marginBottom: '5px', marginRight: '5px'}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Length</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={length}
              label="Length"
              onChange={(e) => setLength(e.target.value)}
            >
              <MenuItem value={15}>15 Min</MenuItem>
              <MenuItem value={30}>30 Min</MenuItem>
              <MenuItem value={45}>45 Min</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Stack direction="row" spacing={1}>
          {
            bodyParts.map((part, i) => <Button key={i} variant="outlined" size="small" endIcon={<DeleteIcon />} onClick={() => removePart(part)}>{part}</Button>)
          }
          <BuildCircleIcon onClick={ length === '' ? () => setOpenDialog(true) : build } />
        </Stack>
          <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          >
          <DialogTitle id="alert-dialog-title">
            {"Please select a length for your flow"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          m="auto"
          style={{maxWidth: '401px'}}
        >
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 401 622">
            <image width="401" height="622" xlinkHref={skelly}></image>
            <a onClick={() => handleClick('shoulders')}>
              <rect x="118" y="94" fill="#ffb627" opacity={bodyParts.includes('shoulders') ? '95%' : '50%'} width="50" height="50"></rect>
            </a><a onClick={() => handleClick('neck')}>
              <rect x="174" y="69" fill="#ff9505" opacity={bodyParts.includes('neck') ? '95%' : '50%'} width="52" height="50"></rect>
            </a><a onClick={() => handleClick('back')}>
              <rect x="171" y="182" fill="#ff9505" opacity={bodyParts.includes('back') ? '95%' : '50%'} width="50" height="50"></rect>
            </a><a onClick={() => handleClick('chest')}>
              <rect x="170" y="128" fill="#e2711d" opacity={bodyParts.includes('chest') ? '95%' : '50%'} width="50" height="50"></rect>
            </a><a onClick={() => handleClick('hips')}>
              <rect x="134" y="266" fill="#cc5803" opacity={bodyParts.includes('hips') ? '95%' : '50%'} width="129" height="59"></rect>
            </a><a onClick={() => handleClick('core')}>
              <rect x="154" y="219" fill="#ffb627" opacity={bodyParts.includes('core') ? '95%' : '50%'} width="84" height="50"></rect>
            </a><a onClick={() => handleClick('legs')}>
              <rect x="139" y="371" fill="#ffb627" opacity={bodyParts.includes('legs') ? '95%' : '50%'} width="111" height="142"></rect>
            </a><a onClick={() => handleClick('shoulders')}>
              <rect x="227" y="100" fill="#ffb627" opacity={bodyParts.includes('shoulders') ? '95%' : '50%'} width="50" height="50"></rect>
            </a>
          </svg>
        </Box>
        </> :
        <Box sx={{ flexGrow: 1 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            m="auto"
          >
          <div>{`a ${length} minute flow focusing on ${bodyParts.join(' and ')}`}</div>
          <Button onClick={() => setOpenSave(true)}>Save Flow</Button>
          <Dialog open={openSave} onClose={() => setOpenSave(false)}>
            <DialogTitle>Save Flow</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please name this flow:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={flowName}
                fullWidth
                variant="standard"
                onChange={(e) => setFlowName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={saveFlow}>Save</Button>
            </DialogActions>
          </Dialog>
          </Box>
          <Grid container spacing={2}>
            {
              flow.map((pose, i) => <PoseCard key={i} pose={pose} i={i} changeFlow={changeFlow} />)
            }
          </Grid>
        </Box>
      }
    </>
  )

};

export default BuildSetUp;