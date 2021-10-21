import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import BuildSetUp from './BuildSetUp.jsx';

const Build = () => {
  const [view, setView] = useState('main');
  const [openDialog, setOpenDialog] = useState(false);
  const [occupation, setOccupation] = useState('I spend a lot of time at a desk');
  const [bodyParts, setBodyParts] = useState([]);

  const occupationBuild = () => {
    console.log(occupation);
    if (occupation === 'I spend a lot of time at a desk') {
      setBodyParts(['neck', 'back']);
    } else if (occupation === 'I spend a lot of time standing up') {
      setBodyParts(['hips', 'back']);
    } else if (occupation === 'I spend a lot of time sitting down') {
      setBodyParts(['shoulders', 'back']);
    }
    setView('occupation');
  }

  const renderView = () => {
    if (view === 'main') {
      return (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{margin: '50px'}}
          >
            <Button variant="contained" disableElevation onClick={() => setOpenDialog(true)}>
              build a flow based on how you spend your time
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
            <Button variant="contained" disableElevation onClick={() => setView('body')}>
              build a flow focusing on a body part
            </Button>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{margin: '50px'}}
          >
            <Button variant="contained" disableElevation>
              i want a video!
            </Button>
          </Box>
        </>
      )
    } else {
      return (
       <BuildSetUp jobBodyParts={bodyParts}/>
      )
    }
  }


  return (
    <div>
      {renderView()}
    </div>
  )
}

export default Build;