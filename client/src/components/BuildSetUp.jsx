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
  Chip,
  Alert
} from '@mui/material';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import PoseCard from './PoseCard.jsx';
import YouTubeVideoPlayer from './YouTubeVideoPlayer.jsx';
import Skellyton from './Skellyton.jsx';

const BuildSetUp = ({ jobBodyParts, video, savedFlow }, props) => {
  const [length, setLength] = useState('');
  const [bodyParts, setBodyParts] = useState(jobBodyParts);
  const [openDialog, setOpenDialog] = useState(false);
  const [flow, setFlow] = useState(savedFlow || []);
  const [openSave, setOpenSave] = useState(false);
  const [flowName, setFlowName] = useState('');
  const [videos, setVideos] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [shared, setShared] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleClick = (part) => {
    if (bodyParts.length === 2) {
      setOpenAlert(true);
    } else {
      setBodyParts((prev) => [...new Set([...prev, part])]);
    }
  };

  const removePart = (part) => {
    if (openAlert) {
      setOpenAlert(false);
    }
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
        console.warn(err);
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
      flowName,
      flow,
      length,
      is_public: shared,
      difficulty
    };
    axios.post('/flow/saveFlow', { data: data})
      .then(() => {
      })
      .catch(err => {
       console.warn(err);
      });
  };

  const getDifficulty = () => {
    const countObj = (flow.map(pose => pose.difficulty)).reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});

    if (countObj.advanced >= 3) {
      setDifficulty('advanced');
    } else if (countObj.intermediate >= .25 * flow.length) {
      setDifficulty('intermediate');
    } else if (countObj.advanced >= 1) {
      setDifficulty('intermediate');
    } else {
      setDifficulty('beginner');
    }
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
        console.warn(err);
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
          {
            openAlert ?
            <Alert severity="warning">Please select a maximum of two body parts</Alert>
          : null
          }
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
            <Stack direction="row" spacing={1} paddingLeft="15px">
              {
                bodyParts.length ?
                bodyParts.map((part, i) => <Chip key={i} label={part} variant="outlined" onDelete={() => removePart(part)} />)
                : <Chip label={"Choose up to 2 body parts"} />
                }
                {
                  !video ?
                  <Button style={{ marginLeft: 0 }}><BuildCircleIcon onClick={length === ''
                    ? () => setOpenDialog(true)
                    : build}
                  /></Button>
                  : <Button onClick={youTubeSearch}>Search</Button>
                }
              </Stack>
              <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
              >
                <DialogTitle id="alert-dialog-title">
                  Please select a length
              </DialogTitle>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)} autoFocus>
                    Close
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Skellyton bodyParts={bodyParts} handleClick={handleClick}/>
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
              {length ?
                <>
                <Chip label={`${length} min`} />
                {
                  bodyParts.length ?
                  bodyParts.map((part, i) => <Chip key={i} label={part} style={{ marginLeft: '5px' }}/>)
                  : null
                }
                <Button><SaveAltIcon onClick={() => setOpenSave(true)} /></Button>
                </>
              : null
              }
              <Dialog
                open={openSave}
                onClose={() => setOpenSave(false)}
                fullWidth={true}
              >
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
                  <FormControlLabel control={<Switch checked={shared} onChange={(e) => setShared(e.target.checked)}/>} label='Public' />
                  <Button onClick={saveFlow}>Save</Button>
                </DialogActions>
              </Dialog>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                m="auto"
              >
                <Chip label={`Predicted Difficulty: ${difficulty}`} variant="outlined" style={{ margin: '5px' }} />
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
