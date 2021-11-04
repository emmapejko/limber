import React from 'react';
import {
  Switch, Route, Link, useRouteMatch,
} from 'react-router-dom';
import Button from '@mui/material/Button';
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

const BuildFlow = (props) => {
  const { path, url } = useRouteMatch();
  const color = {
    backgroundColor: '#fff8e1'
  }

  return (
    <div style={color}>
    <>
      <Button style={props.style}><Link to={`${url}/build`} style={{textDecoration: 'none', color:"inherit"}}>Build A Flow</Link></Button>
      <Switch>
        <Route path={`${path}/build`}>
          <Build />
        </Route>
      </Switch>
    </>
    </div>
  );
}

export default BuildFlow;