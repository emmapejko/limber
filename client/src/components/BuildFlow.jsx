import React from 'react';
import {
  Switch, Route, Link, useRouteMatch,
} from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Build from './Build.jsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BuildFlow(props) {

  //change state management to redirect on button click and remove modals
  const { path, url } = useRouteMatch();
  

  return (
    <>
      <Button style={props.style}><Link to={`${url}/build`} style={{textDecoration: 'none'}}>Build A Flow</Link></Button>
      <Switch>
        <Route path={`${path}/build`}>
          <Build />
        </Route>
      </Switch>
    </>
  );
}
