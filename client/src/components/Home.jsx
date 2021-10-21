import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import NavBar from './NavBar.jsx';
import Build from './Build.jsx';
import Connect from './Connect.jsx';
import DashBoard from './DashBoard.jsx';
import DashBoardCard from './DashBoardCard.jsx';
import SavedFlow from './SavedFlow.jsx';
import SavedFlowCard from './SavedFlowCard.jsx';
import BuildFlow from './BuildFlow.jsx';
import BuildFlowCard from './BuildFlowCard.jsx';
import PoseKnown from './PoseKnown.jsx';
import LearningPose from './LearningPose.jsx';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const style = {
  backgroundColor: '#f9fbe7'
};

const color = {
  backgroundColor: '#e0f2f1'
};
function Home () {
  const { path, url } = useRouteMatch();
  const [pose, setPose] = React.useState([]);

  //axios call to database for poseKnown
  const whatIsKnown = () => {
    axios
      .get('/profile/allPoses')
      .then(res => {
        console.log(res.data);
        setPose(res.data); // res.data?
       
      })
      .catch(err => {
        console.log(err, 'Error from poseKnown');
      });
    // axios
    // .post('/profile')
    // .then(res => {
    //   console.log('flag:', res.data);
    //   setPose(res.data); // res.data?
       
    // })
    // .catch(err => {
    //   console.log(err, 'Error from poses');
    // });
  };

  useEffect(() => {
    whatIsKnown();
  }, []);

  return (
    <div style={style}>
      <div>Home / User Profile</div>
      <div>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 12,
              width: 220,
              height: 250,
            },
          }}
        >
          <Paper style={color} elevation={3}>
            <DashBoard />
            <DashBoardCard />
          </Paper>
          <Paper elevation={3}> 
            <SavedFlow />
            <SavedFlowCard />
          </Paper>
          <Paper elevation={3}>
            <BuildFlow />
            <BuildFlowCard />
          </Paper>
        </Box>
      </div>
      <div>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 10,
              width: 450,
              height: 100,
            },
          }}
        >
  
          <Paper elevation={3}>
            <PoseKnown 
              pose={pose}

            />
          </Paper>
          <Paper elevation={3}> 
            <LearningPose 
              pose={pose}
            />
          </Paper>
        </Box>
      </div>
    </div>
  );
}

export default Home;
