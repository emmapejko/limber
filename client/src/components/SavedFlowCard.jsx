import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import FlowItems from './FlowItems.jsx';


function SavedFlowCard(props) {

  const [flows, setFlows] = useState([]);

  //axios get request to flows table
  const getSavedFlows = () => {
    axios.get('/profile/savedFlows')
    .then(({ data }) => {
     
      setFlows(data);
    })
    .catch((err) => {
      console.log(err, 'savedFlows');
    });
  }

  useEffect(() => {
    getSavedFlows();
  }, []);

  // set to max of five flows displayed
  return (
    <Typography style={props.style}>
      {flows.map((flow, i) => <FlowItems key={i} flow={flow} style={props.style}/>)}
    </Typography>
  );
}

export default SavedFlowCard;
