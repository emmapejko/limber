import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Box,
  Grid,
  Button,
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
    <Box sx={{ flexGrow: 1, margin: '20px'}}>
      {
        users.map((u, i) => <Grid  container spacing={2} key={i} style={{ width: '20%'}}>
          <Grid item xs={8}>{u.full_name}</Grid>
          <Grid item xs={4}><Button onClick={() => followOrUnfollow(u)}>{followees.map(f => f.full_name).includes(u.full_name) ? 'Unfollow' : 'Follow'}</Button></Grid>
          </Grid>)
      }
    </Box>
  )
}

export default FollowersList;