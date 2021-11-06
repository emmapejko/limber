import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import {
  Box,
  Grid,
  Button,
  Paper,
  Typography
} from '@mui/material';

const FollowersList = ({ user }) => {
  const [followees, setFollowees] = useState([]);
  const [users, setUsers] = useState([]);

  const getFollowees = () => {
    axios.get(`/followers/${user.id}`)
      .then(({ data }) => {
        setFollowees(data);
      })
      .catch(err => {
        console.warn(err);
      })
  };

  const getAllUsers = () => {
    axios.get(`/followers/allusers/${user.id}`)
      .then(({ data }) => {
        setUsers(data);
        getFollowees();
      })
      .catch(err => {
        console.warn(err);
      })
  }

  const followOrUnfollow = (u) => {
    if (followees.map(f => f.full_name).includes(u.full_name)) {
      axios.delete(`/followers/unfollow/${user.id}&${u.id}`)
        .then(res => {
          getAllUsers();
        })
        .catch(err => {
          console.warn(err);
        })
    } else {
      axios.post(`/followers/follow/${user.id}&${u.id}`)
        .then(res => {
          getAllUsers();
        })
        .catch(err => {
          console.warn(err)
        })
    }
  }

  useEffect(() => {
    if (user.id) {
      getAllUsers();
    }
  }, [user])

  return (
    <Box sx={{overflow:'scroll', maxHeight:'200px'}}>
      <List dense sx={{bgcolor: 'background.paper' }}>
        {
        users.map((u, i) => 
         <ListItem spacing={1} key={i} >
              <ListItemAvatar>
                  <Avatar 
                    src={u.picture}
                  />
                </ListItemAvatar>
            <Typography sx={{ flex: 1 }}>{u.full_name}</Typography>
              <Button onClick={() => followOrUnfollow(u)}>{followees.map(f => f.full_name).includes(u.full_name) ? <FavoriteIcon /> : <FavoriteBorderIcon />}</Button>
          </ListItem>
              )
              }
            </List>
            </Box>
  );
}

export default FollowersList;
