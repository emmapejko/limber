import React from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import NavBar from './NavBar.jsx';
import Build from './Build.jsx';
import Connect from './Connect.jsx';

function Home () {
  const { path, url } = useRouteMatch();

  return (
    <div>
      Welcome Home! We did it Joe!
      <div>
        <Link to={`${url}/build`}>Build</Link>
        <Link to={`${url}/connect`}>Connect</Link>
      </div>
      <Switch>
        <Route path={`${path}/build`}>
          <Build />
        </Route>
        <Route path={`${path}/connect`}>
          <Connect />
        </Route>
      </Switch>
    </div>
  )
}

export default Home;