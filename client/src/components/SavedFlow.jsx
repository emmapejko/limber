import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Modal,
  Button,
  Tab,
  Typography,
} from '@mui/material';
import {
  TabContext,
  TabList,
  TabPanel,
} from '@mui/lab';

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
  const [open, setOpen] = useState(false);
  const [flows, setFlows] = useState([]);
  const [savedFlow, setSavedFlow] = useState([]);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [name, setName] = useState(null);
  const [tab, setTab] = useState('0');
  const [sharedFlows, setSharedFlows] = useState([]);

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
      setFlows(data);
      getSharedFlows();
    })
    .catch((err) => {
      console.error(err, 'savedFlows');
    });
  }

  const getSharedFlows = () => {
    axios.get('/profile/sharedFlows')
      .then(({ data }) => {
        console.log('shared', data);
        setSharedFlows(data);
      })
      .catch(err => {
        console.error(err, 'sharedFlows');
      })
  }

  useEffect(() => {
    getSavedFlows();
  }, []);


  return (
    <>
      <div style={color}>
        <Button onClick={handleOpen}>Flows</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: width, height: height }}>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={(event, newValue) => setTab(newValue)} aria-label="lab API tabs example">
                <Tab label="Your Flows" value="0" />
                <Tab label="Shared Flows" value="1" />
              </TabList>
            </Box>
            <TabPanel value="0">
                <Typography><h2 id="parent-modal-title">{name ? name : null}</h2></Typography>
                {
                  savedFlow.length ?
                  <BuildSetUp jobBodyParts={[]} video={false} savedFlow={savedFlow} /> :
                  <>{flows.map((flow, i) => <Button onClick={() => renderBuiltFlow(flow)}><div key={i}>{flow.name}</div></Button>)}</>
                }
            </TabPanel>
            <TabPanel value="1">
              <Typography><h2 id="parent-modal-title">{name ? name : null}</h2></Typography>
                {
                  savedFlow.length ?
                  <BuildSetUp jobBodyParts={[]} video={false} savedFlow={savedFlow} /> :
                  <>{sharedFlows.map((flow, i) => <Button onClick={() => renderBuiltFlow(flow)}><div key={i}>{flow.name}</div></Button>)}</>
                }
            </TabPanel>
          </TabContext>
          </Box>
        </Modal>
      </div>
    </>
  );
}
