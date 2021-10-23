import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import {
  Switch, Route, Link, useRouteMatch,
} from 'react-router-dom';

import BuildSetUp from './BuildSetUp.jsx';

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
  overflow: 'scroll'
};

const color = {
  backgroundColor: '#e0f2f1',
};

export default function SavedFlow() {
  const [open, setOpen] = React.useState(false);
  const [flows, setFlows] = useState([]);
  const [savedFlow, setSavedFlow] = React.useState([]);
  const [width, setWidth] = React.useState(400);
  const [height, setHeight] = React.useState(300);
  const [name, setName] = React.useState(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setName(null);
    setSavedFlow([]);
    setWidth(400);
    setHeight(300);
  };

  const renderBuiltFlow = (flow) => {
    axios.get(`/flow/getSavedFlow/${flow.id}`)
      .then(({ data }) => {
        setName(flow.name);
        setSavedFlow(data);
        setWidth('90%');
        setHeight('90%');
      })
      .catch(err => {
        console.error(err);
      })
  };

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
    <>
      <div style={color}>
        <Button onClick={handleOpen}>SavedFlow</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: width, height: height }}>
            <h2 id="parent-modal-title">{name ? name : 'List of Flows'}</h2>

            {
              savedFlow.length ?
              <BuildSetUp jobBodyParts={[]} video={false} savedFlow={savedFlow} /> :
              <>{flows.map((flow, i) => <Button onClick={() => renderBuiltFlow(flow)}><div key={i}>{flow.name}</div></Button>)}</>
            }
          </Box>
        </Modal>
      </div>
    </>
  );
}
