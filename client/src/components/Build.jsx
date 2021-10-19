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
  const [occupation, setOccupation] = useState('I work at a desk');
  const [bodyParts, setBodyParts] = useState([]);

  const occupationBuild = () => {
    console.log(occupation);
    if (occupation === 'I work at a desk') {
      setBodyParts(['neck', 'back']);
    } else if (occupation === 'I work standing up') {
      setBodyParts(['hips', 'back']);
    } else if (occupation === 'I work sitting down') {
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
              build a flow based on your occupation
            </Button>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
              <DialogTitle>Describe your occupation</DialogTitle>
              <DialogContent>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="occupation"
                  defaultValue="I work at a desk"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="I work at a desk"
                    control={<Radio />}
                    label="I work at a desk"
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                  <FormControlLabel
                    value="I work standing up"
                    control={<Radio />}
                    label="I work standing up"
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                  <FormControlLabel
                    value="I work sitting down"
                    control={<Radio />}
                    label="I work sitting down"
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                </RadioGroup>
              </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button onClick={occupationBuild}>Build</Button>
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