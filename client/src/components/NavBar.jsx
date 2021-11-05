import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Typography,
  Tooltip,
  Chip
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import {
  Switch, Route, Link, useRouteMatch,
} from 'react-router-dom';

import Build from './Build.jsx';
import Connect from './Connect.jsx';
import Home from './Home.jsx';
import Logo from './Logo.jsx';
import BananaLogo from './BananaLogo.jsx';

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
    fontSize: `${fontSize}px`, 
    fontWeight: 420
  }

  const lineBreak = {
    border: '1px solid #ffb627',
    borderRadius: '5px',
    marginTop: "0px"
}

const banner = {
  backgroundColor: '#F8F8FF'
}

  return (
    <div>
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Link to={`${url}`} style={{ marginRight: '10px' }}><BananaLogo /></Link>
        <Link to={`${url}/build`} style={{textDecoration: 'none', color:"inherit", marginRight: '5px'}} ><Chip label="Build" variant="outlined" size="small" color="primary" clickable /></Link>
        <Link to={`${url}/connect`} style={{textDecoration: 'none', color:"inherit", flex: 1 }} ><Chip label="Connect" variant="outlined" size="small" color="primary" clickable /></Link>
        <IconButton onClick={() => setFontSize(fontSize + 2)}>+</IconButton>
          <IconButton onClick={() => setFontSize(fontSize - 2)}>-</IconButton>
        <Tooltip title="Profile">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }}>
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
          <Link to={`${url}`} style={{textDecoration: 'none', color:"inherit"}}>Profile</Link>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <a href="/logout" style={{textDecoration: 'none', color:"inherit"}}>Logout</a>
        </MenuItem>
      </Menu>
      <hr style={lineBreak}/>
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
    </div>
  );
};

export default NavBar;
