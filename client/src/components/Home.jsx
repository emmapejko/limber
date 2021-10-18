import React from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import NavBar from './NavBar.jsx';
import Build from './Build.jsx';
import Connect from './Connect.jsx';

function Home () {
  const { path, url } = useRouteMatch();

  return (
    <div>
      <div>Home / User Profile</div>
    </div>
  )
}

export default Home;