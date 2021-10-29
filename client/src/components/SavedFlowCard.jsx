import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Typography from '@mui/material/Typography';

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
    <Typography style={props.style}>
      {flows.map((flow, i) => (
          (i < 8) ?
          <div style={props.style} key={i}>{flow.name}</div>
          : null
      ))}
    </Typography>
    </div>
  );
}

export default SavedFlowCard;
