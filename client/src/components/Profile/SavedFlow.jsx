import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Modal,
  Button,
  Tab,
  Typography,
  Chip,
  Avatar,
  Tooltip,
  Icon
} from '@mui/material';
import {
  TabContext,
  TabList,
  TabPanel,
} from '@mui/lab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';

import BuildSetUp from '../Build/BuildSetUp.jsx';

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

const SavedFlow = (props) => {
  const [open, setOpen] = useState(false);
  const [flows, setFlows] = useState([]);
  const [savedFlow, setSavedFlow] = useState([]);
  const [width, setWidth] = useState('40%');
  const [height, setHeight] = useState(300);
  const [name, setName] = useState(null);
  const [tab, setTab] = useState('0');
  const [sharedFlows, setSharedFlows] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [owner, setOwner] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setName(null);
    setSavedFlow([]);
    setWidth('40%');
    setHeight(300);
    setOwner(null);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setName(null);
    setSavedFlow([]);
    setWidth('40%');
    setHeight(300);
    setOwner(null);
  }

  const renderBuiltFlow = (flow) => {
    axios.get(`/flow/getSavedFlow/${flow.id}`)
      .then(({ data }) => {
        setSavedFlow(data);
      })
      .then(() => {
        axios.get(`/flow/user/${flow.userId}`)
          .then(({ data }) => {
            setOwner(data);
            setWidth('90%');
            setHeight('90%');
            setName(flow.name);
          })
      })
      .catch(err => {
        console.warn(err);
      })
  };

  const addOrRemoveFavorite = () => {
    if (favorites.map(flow => flow.name).includes(name)) {
      axios.delete(`/favorites/${name}`)
        .then(() => {
          getFavorites();
        })
        .catch(err => {
          console.warn(err);
        })

    } else {
      axios.post('/favorites/', { data: { name }})
        .then(() => {
          getFavorites();
        })
        .catch(err => {
          console.warn(err);
        })
    }
  }

  const getFavorites = () => {
    axios.get('/favorites/')
      .then(({ data }) => {
        setFavorites(data);
      })
      .catch(err => {
        console.warn(err);
      })
  }

  const getSavedFlows = () => {
    axios.get('/profile/savedFlows')
    .then(({ data }) => {
      setFlows(data);
      getSharedFlows();
    })
    .catch((err) => {
      console.warn(err, 'savedFlows');
    });
  }

  const getSharedFlows = () => {
    axios.get('/profile/sharedFlows')
      .then(({ data }) => {
        setSharedFlows(data);
        getFavorites();
      })
      .catch(err => {
        console.warn(err, 'sharedFlows');
      })
  }

  const deleteFlow = () => {
    axios.delete(`/flow/${name}`)
      .then(() => {
        getSavedFlows();
        setName(null);
        setSavedFlow([]);
        setWidth(400);
        setHeight(300);
      })
      .catch(err => {
        console.warn(err);
      })
  }

  useEffect(() => {
    getSavedFlows();
  }, []);
  const lineBreak = {
      border: '1px solid #ffb627',
      borderRadius: '5px',
  }
  const banner = {
    backgroundColor: '#F8F8FF'
  }

  return (
    <>
      <div style={banner}>
        <Button onClick={handleOpen} style={props.style}>Flows</Button>
        <hr style={lineBreak}/>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: width, height: height }}>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleTabChange} aria-label="lab API tabs example" variant="scrollable">
                <Tab label="Your Flows" value="0" />
                <Tab label="Shared Flows" value="1" />
                <Tab label="Favorites" value="2" />
              </TabList>
            </Box>
            <TabPanel value="0">
                {
                  name ?
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    m="auto"
                  ><Typography><h2 id="parent-modal-title" style={{ paddingRight: '5px'}}>{name}</h2></Typography>
                    {
                      favorites.map(flow => flow.name).includes(name) ?
                      <Tooltip title="Unfavorite">
                        <Button onClick={addOrRemoveFavorite}>
                          <FavoriteIcon />
                        </Button>
                      </Tooltip>
                       :
                       <Tooltip title="Favorite">
                        <Button onClick={addOrRemoveFavorite}>
                          <FavoriteBorderIcon />
                        </Button>
                        </Tooltip>
                    }
                  <Tooltip title="Delete">
                  <Button onClick={deleteFlow}><DeleteIcon /></Button>
                  </Tooltip>
                  </Box>
                  : null
                }
                {
                  savedFlow.length ?
                  <BuildSetUp jobBodyParts={[]} savedFlow={savedFlow} /> :
                  <>{flows.map((flow, i) => <Button onClick={() => renderBuiltFlow(flow)} key={i}><div>{flow.name}</div></Button>)}</>
                }
            </TabPanel>
            <TabPanel value="1">
                {
                  name ?
                  <><Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    m="auto"
                  ><Typography><h2 id="parent-modal-title" style={{ paddingRight: '5px'}}>{name}</h2></Typography>
                  {
                      favorites.map(flow => flow.name).includes(name) ?
                      <Tooltip title="Unfavorite">
                        <Button onClick={addOrRemoveFavorite}>
                          <FavoriteIcon />
                        </Button>
                      </Tooltip>
                       :
                       <Tooltip title="Favorite">
                        <Button onClick={addOrRemoveFavorite}>
                          <FavoriteBorderIcon />
                        </Button>
                        </Tooltip>
                    }
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    m="auto"
                    paddingBottom="5px"
                  >
                  <Chip
                    avatar={<Avatar alt={owner.full_name} src={owner.picture} />}
                    label={owner.full_name}
                  />
                  </Box>
                  </>
                  : null
                }
                {
                  savedFlow.length ?
                  <BuildSetUp jobBodyParts={[]} savedFlow={savedFlow} /> :
                  <>{sharedFlows.map((flow, i) => <Button onClick={() => renderBuiltFlow(flow)} key={i}><div>{flow.name}</div></Button>)}</>
                }
            </TabPanel>
            <TabPanel value="2">
                {
                  name ?
                  <><Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    m="auto"
                  ><Typography><h2 id="parent-modal-title" style={{ paddingRight: '5px'}}>{name}</h2></Typography>
                  {
                      favorites.map(flow => flow.name).includes(name) ?
                      <Tooltip title="Unfavorite">
                        <Button onClick={addOrRemoveFavorite}>
                          <FavoriteIcon />
                        </Button>
                      </Tooltip>
                       :
                       <Tooltip title="Favorite">
                        <Button onClick={addOrRemoveFavorite}>
                          <FavoriteBorderIcon />
                        </Button>
                        </Tooltip>
                    }
                  {
                    flows.map(flow => flow.name).includes(name) ?
                    <Tooltip title="Delete">
                    <Button onClick={deleteFlow}><DeleteIcon /></Button>
                    </Tooltip>
                    : null
                  }
                  </Box>
                  {
                    flows.map(flow => flow.name).includes(name) ?
                    null :
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        m="auto"
                        paddingBottom="5px"
                      >
                        <Chip
                          avatar={<Avatar alt={owner.full_name} src={owner.picture} />}
                          label={owner.full_name}
                        />
                      </Box>
                  }
                  </>
                  : null
                }
                {
                  savedFlow.length ?
                  <BuildSetUp jobBodyParts={[]} savedFlow={savedFlow} /> :
                  <>{favorites.map((flow, i) => <Button onClick={() => renderBuiltFlow(flow)} key={i}><div>{flow.name}</div></Button>)}</>
                }
            </TabPanel>
          </TabContext>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default SavedFlow;