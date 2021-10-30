import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'

function SavedFlowCard(props) {

  const [flows, setFlows] = useState([]);

  //axios get request to flows table
  const getSavedFlows = () => {
    axios.get('/profile/savedFlows')
    .then(({ data }) => {
      setFlows(data);
    })
    .catch((err) => {
      console.warn(err, 'savedFlows');
    });
  }

  useEffect(() => {
    getSavedFlows();
  }, []);

  return (
    <div>
    <Box
      m='4px'
    >
    <Typography style={props.style}>
      {flows.map((flow, i) => (
          (i < 8) ?
          <div style={props.style} key={i}>{flow.name}</div>
          : null
      ))}
    </Typography>
    </Box>
    </div>
  );
}

export default SavedFlowCard;
