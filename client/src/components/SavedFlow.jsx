import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const color = {
  backgroundColor: '#e0f2f1',
};

function ChildModal({ flows }) {
  console.log('flow:', flows);
  const [open, setOpen] = React.useState(false);
  const [selectedFlow, setSelectedFlow] = React.useState({});
  const handleOpen = (flow) => {
    setSelectedFlow(flow);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

// modal func--> param: pose, 
// const ModalFunc = () => {

// }

  return (
    <>
      
        {flows.map((flow, i) => <Button onClick={() => handleOpen(flow)}><div key={i}>{flow.name}</div></Button>)}
        <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Which renders a different flow</h2>
          <p id="child-modal-description">
         <div>{selectedFlow.name}</div>
           
          </p>
          <Button onClick={handleClose}>Close Flows</Button>
        </Box>
      </Modal> 
      
    </>
  );
}

export default function SavedFlow() {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  
  const [flows, setFlows] = useState([]);

  //axios get request to flows table
  const getSavedFlows = () => {
    axios.get('/profile/savedFlows')
    .then(({ data }) => {
      console.log('savedFlows:', data);
      setFlows(data);
    })
    .catch((err) => {
      console.log(err, 'savedFlows');
    });
  }

  useEffect(() => {
    getSavedFlows();
  }, []);


  return (
    <div style={color}>
      <Button onClick={handleOpen}>SavedFlow</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">List of Flows</h2>
          
          <ChildModal flows={flows}/>
        
          
        </Box>
      </Modal>
    </div>
  );
}
