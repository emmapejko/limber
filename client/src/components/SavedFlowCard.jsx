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
  
  const getFontSize = () => {
    return Number(props.style.fontSize.slice(0,2)) + 4;
  }
  // const color = {
  //   backgroundColor: '#fffde7'
  // }
  
  return (
    <div>
    <Box
       display="flex"
       alignItems="center"
       justifyContent="center"
       m="auto"
    >
    <Typography style={{ fontSize: `${getFontSize()}px`}}>
      {flows.map((flow, i) => (
          (i < 8) ?
          <div style={{ fontSize: `${getFontSize()}px`}} key={i}>{flow.name}</div>
          : null
      ))}
    </Typography>
    </Box>
    </div>
  );
}
export default SavedFlowCard; 
