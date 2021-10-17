import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Home.jsx';
import Login from './Login.jsx';

function App() {
   return (
       <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <Login />
            </Route>
            <Route path='/:user'>
              <Home />
            </Route>
            <Route>
              <div>404 page not available</div>
            </Route>
          </Switch>
       </BrowserRouter>
   )
};

export default App;