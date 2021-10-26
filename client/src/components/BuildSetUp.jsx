import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';

import skelly from '../images/skellyton.png';
import PoseCard from './PoseCard.jsx';
import YouTubeVideoPlayer from './YouTubeVideoPlayer.jsx';

const BuildSetUp = ({ jobBodyParts, video, savedFlow }) => {
  const [length, setLength] = useState('');
  const [bodyParts, setBodyParts] = useState(jobBodyParts);
  const [openDialog, setOpenDialog] = useState(false);
  const [flow, setFlow] = useState(savedFlow || []);
  const [openSave, setOpenSave] = useState(false);
  const [flowName, setFlowName] = useState('');
  const [videos, setVideos] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [shared, setShared] = useState(false);

  const handleClick = (part) => {
    setBodyParts((prev) => [...new Set([...prev, part])]);
  };

  const removePart = (part) => {
    setBodyParts(bodyParts.filter((el) => el !== part));
  };

  const build = () => {
    const data = {
      length,
      bodyParts,
    };
    axios.post('/flow', { data })
      .then(({ data }) => {
        setFlow(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const changeFlow = (i, newPose) => {
    const newFlow = [...flow];
    newFlow.splice(i, 1, newPose);
    setFlow(newFlow);
  };

  const saveFlow = () => {
    setOpenSave(false);
    const data = {
      flowName: flowName,
      flow: flow,
      length: length
    };
    axios.post('/flow/saveFlow', { data: data})
      .then(() => {
      })
      .catch(err => {
        console.error(err);
      });
  };

  const getDifficulty = () => {
    const countObj = (flow.map(pose => pose.difficulty)).reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});

    if (countObj.advanced >= 3) {
      setDifficulty('advanced');
    } else if (countObj.intermediate >= .25 * flow.length) {
      setDifficulty('intermediate');
    } else if (countObj.advanced + countObj.intermediate >= .3 * flow.length) {
      setDifficulty('intermediate');
    } else {
      setDifficulty('beginner');
    }

    console.log(countObj);
  }

  const youTubeSearch = () => {
    const data = {
      query: `${length} min ${bodyParts.join(' ')} yoga`
    }
    axios.put('/youtube', { data })
      .then(({ data }) => {
        setVideos(data.items);
      })
      .catch(err => {
        console.error(err);
      })
  }

  useEffect(() => {
    if (flow.length) {
      getDifficulty();
    }
  }, [flow])

  return (
    <>
      { !flow.length && !videos.length
        ?
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            m="auto"
          >
            <Box sx={{
              minWidth: 120, marginTop: '5px', marginBottom: '5px', marginRight: '5px',
            }}
            >
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
                {
                  !video ?
                  <BuildCircleIcon onClick={length === ''
                    ? () => setOpenDialog(true)
                    : build}
                  />
                  : <Button onClick={youTubeSearch}>Search</Button>
                }
              </Stack>
              <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
              >
                <DialogTitle id="alert-dialog-title">
                  Please select a length for your flow
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
        <>
        {
          !flow.length && videos.length ?
            <YouTubeVideoPlayer videos={videos} />
            :
            <Box sx={{ flexGrow: 1 }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                m="auto"
              >
              <Typography style={{ paddingRight: '5px' }}>Predicted Difficulty: {difficulty}</Typography>
              {length ?
              <><Typography><h4>{ bodyParts.length ? `a ${length} minute flow focusing on ${bodyParts.join(' and ')}` : `a ${length} minute flow`}</h4></Typography>
              <Button onClick={() => setOpenSave(true)} variant="outlined" style={{ marginLeft: '5px' }}>Save Flow</Button></> : null }
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
                  <FormControlLabel control={<Switch checked={shared} onChange={(e) => setShared(e.target.checked)}/>} label={shared ? 'Public' : 'Private'} />
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
        }
    </>
  );
};

export default BuildSetUp;
