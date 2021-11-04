import React, { useState } from 'react';
import {
  Box,
  MobileStepper,
  Button,
} from '@mui/material';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';
import SwipeableViews from 'react-swipeable-views';

const YouTubeVideoPlayer = ({ videos }) => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = videos.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 700, flexGrow: 1, alignItems: 'center', margin: 'auto'}}>
      <SwipeableViews
        axis={'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {videos.map((video, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box sx={{ textAlign: 'center', width: '100%', height: '100%'}}>
                <iframe title={video.snippet.title} style={{ display: 'auto', width: '100%', height: '50vh' }} src={`https://www.youtube.com/embed/${video.id.videoId}`} allowFullScreen></iframe>
              </Box>
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
              <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default YouTubeVideoPlayer;
