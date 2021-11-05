import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Charts from './Charts.jsx';
import Box from '@mui/material/Box'

const createData = (name, pose, flows, joes, otherdata, props) => {
  return {
    name, pose, flows, joes, otherdata,
  };
}

const rows = [
  createData('Downward Dog', 159, 6.0, 24, 4.0),
  createData('sravasana', 237, 9.0, 37, 4.3),
  createData('percolanyasa', 262, 16.0, 24, 6.0),
  createData('ohcoolatta', 305, 3.7, 67, 4.3),
  createData('dragon drop', 356, 16.0, 49, 3.9),
];

const DashTable = (props) => {
  const [poses, setPoses] = useState([]);

  const getUserPosesKnown = () => {
    axios.get('profile/userPosesKnown')
      .then(({ data }) => {
        setPoses(data);
      })
      .catch((err) => {
        console.warn(err, 'getUserPosesKnown');
      });
  };
  useEffect(() => {
    getUserPosesKnown();
  }, []);

  return (
    <div>
      
      <Charts poses={poses}/>
    
    </div>
  );
}

export default DashTable;
