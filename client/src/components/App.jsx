import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './Login.jsx';
import Home from './Home.jsx';
import NavBar from './NavBar.jsx';
import io from 'socket.io-client';
import Connect from './Connect.jsx'
import io from 'socket.io-client';

function App() {
  

   return (
     <div>
       <BrowserRouter>
        <Switch>
    <Route exact path='/' >
       <NavBar isLoggedIn={false}/>
    </Route>
      <Route path='/home'>
      <NavBar isLoggedIn={true}/>
    </Route>
       </Switch>
       </BrowserRouter>
     </div>
   )
};

export default App;