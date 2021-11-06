import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './Nav/Login.jsx';
import NavBar from './Nav/NavBar.jsx';

const App = (props) => {
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login style={props.style}/>
        </Route>
        <Route path="/:user">
          <NavBar/>
        </Route>
        <Route>
          <div>404 page not available</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
