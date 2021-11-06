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
  const [occupation, setOccupation] = useState('I spend a lot of time at a desk');
  const [bodyParts, setBodyParts] = useState([]);

  const occupationBuild = () => {
    if (occupation === 'I spend a lot of time at a desk') {
      setBodyParts(['neck', 'back']);
    } else if (occupation === 'I spend a lot of time standing up') {
      setBodyParts(['hips', 'back']);
    } else if (occupation === 'I spend a lot of time sitting down') {
      setBodyParts(['shoulders', 'back']);
    } else if (occupation === "I'll choose focus areas myself") {
      setBodyParts([]);
    }
    setView('occupation');
  };

  return (
    <div>
      {
        view === 'main' ?
        <>
          <Skellyton bodyParts={bodyParts} handleClick={() => true} />
          <Dialog
            open={true}
            onClose={() => setView('body')}
            fullWidth={true}
          >
          <DialogTitle>Build your flow:</DialogTitle>
          <DialogContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
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
                    <FormControlLabel
                      value="I'll choose focus areas myself"
                      control={<Radio />}
                      label="I'll choose focus areas myself"
                      onChange={(e) => setOccupation(e.target.value)}
                    />
                  </RadioGroup>
                </FormControl>
                </Box>
              <DialogActions>
                <Button onClick={occupationBuild}>Continue</Button>
              </DialogActions>
          </DialogContent>
          </Dialog>
        </>
        :
        <BuildSetUp jobBodyParts={bodyParts} />
      }
    </div>
  );
};

export default Build;
