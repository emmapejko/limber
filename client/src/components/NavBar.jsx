import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import {
  Switch, Route, Link, useRouteMatch,
} from 'react-router-dom';

import Build from './Build.jsx';
import Connect from './Connect.jsx';
import Home from './Home.jsx';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({});
  const [fontSize, setFontSize] = useState(16);
  const { path, url } = useRouteMatch();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getProfileImage = () => {
    axios.get('/chat/full_name')
      .then(({ data }) => {
        
        setUser(data);
      })
      .catch(err => {
        console.warn(err);
      })
  }

  useEffect(() => {
    getProfileImage();
  }, []);

  const textSizer = {
    fontSize: `${fontSize}px`
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ minWidth: 100 }} style={textSizer}>LIMBER</Typography>
        <Typography sx={{ minWidth: 100 }} style={textSizer}><Link to={`${url}/build`}>Build</Link></Typography>
        <Typography sx={{ minWidth: 100 }} style={textSizer} style={{ flex: 1 }}><Link to={`${url}/connect`}>Connect</Link></Typography>
        <IconButton onClick={() => setFontSize(fontSize + 2)}>+</IconButton>
          <IconButton onClick={() => setFontSize(fontSize - 2)}>-</IconButton>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }} alt={user.full_name} src={user.picture}/>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar />
          <Link to={`${url}`}>Profile</Link>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <a href="/logout">Logout</a>
        </MenuItem>
      </Menu>
      <hr />
      <Switch>
        <Route path={`${path}/build`}>
          <Build style={textSizer}/>
        </Route>
        <Route path={`${path}/connect`}>
          <Connect style={textSizer}/>
        </Route>
        <Route path={`${path}`}>
          <Home style={textSizer}/>
        </Route>
      </Switch>
    </>
  );
};

export default NavBar;
