import React, { useState } from 'react';
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';

import BuildSetUp from './BuildSetUp.jsx';
import Skellyton from './Skellyton.jsx';

const Build = (props) => {
  const [view, setView] = useState('main');
  const [openDialog, setOpenDialog] = useState(false);
  const [occupation, setOccupation] = useState('I spend a lot of time at a desk');
  const [bodyParts, setBodyParts] = useState([]);

  const occupationBuild = () => {
    if (occupation === 'I spend a lot of time at a desk') {
      setBodyParts(['neck', 'back']);
    } else if (occupation === 'I spend a lot of time standing up') {
      setBodyParts(['hips', 'back']);
    } else if (occupation === 'I spend a lot of time sitting down') {
      setBodyParts(['shoulders', 'back']);
    }
    setView('occupation');
  };

  const renderView = () => {
    if (view === 'main') {
      return (
        <>
          <Skellyton bodyParts={bodyParts} handleClick={() => true} />
          <Dialog
            open={true}
            onClose={() => setView('body')}
            fullWidth={true}
          >
          <DialogTitle>Build your flow: </DialogTitle>
          <DialogContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{ margin: '20px' }}
          >
            <Button variant="outlined" disableElevation onClick={() => setOpenDialog(true)}>
              based on your occupation
            </Button>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
              <DialogTitle>Describe your daily posture</DialogTitle>
              <DialogContent>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="occupation"
                    defaultValue="I spend a lot of time at a desk"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="I spend a lot of time at a desk"
                      control={<Radio />}
                      label="I spend a lot of time at a desk"
                      onChange={(e) => setOccupation(e.target.value)}
                    />
                    <FormControlLabel
                      value="I spend a lot of time standing up"
                      control={<Radio />}
                      label="I spend a lot of time standing up"
                      onChange={(e) => setOccupation(e.target.value)}
                    />
                    <FormControlLabel
                      value="I spend a lot of time sitting down"
                      control={<Radio />}
                      label="I spend a lot of time sitting down"
                      onChange={(e) => setOccupation(e.target.value)}
                    />
                  </RadioGroup>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button onClick={occupationBuild}>Continue</Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button variant="outlined" disableElevation onClick={() => setView('body')}>
              based on a body part
            </Button>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{ margin: '20px' }}
          >
            <Button variant="outlined" disableElevation onClick={() => setView('video')}>
              find a video
            </Button>
          </Box>
          </DialogContent>
          </Dialog>
        </>
      );
    } else if (view === 'video') {
      return (
        <BuildSetUp jobBodyParts={bodyParts} video={true} />
      )
    }
    return (
      <BuildSetUp jobBodyParts={bodyParts} video={false}/>
    );
  };

  return (
    <div>
      {renderView()}
    </div>
  );
};

export default Build;
