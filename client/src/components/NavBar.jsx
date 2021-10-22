import React from 'react';
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { path, url } = useRouteMatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // console.log(url);
  // console.log(path);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}>LIMBER</Typography>
        <Typography sx={{ minWidth: 100 }}><Link to={`${url}/build`}>Build</Link></Typography>
        <Typography sx={{ minWidth: 100 }}><Link to={`${url}/connect`}>Connect</Link></Typography>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
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
          <Build />
        </Route>
        <Route path={`${path}/connect`}>
          <Connect />
        </Route>
        <Route path={`${path}`}>
          <Home />
        </Route>
      </Switch>
    </>
  );
};

export default NavBar;
