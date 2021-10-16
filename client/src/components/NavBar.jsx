import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import Home from "./Home.jsx"
import Build from "./Build.jsx"
import Connect from "./Connect.jsx"

function NavBar ({ isLoggedIn }) {

  return (
    <div>
      <div>
      Limber
      </div>
      {isLoggedIn ? <div>
        <Link to="/home">Home</Link>
        <Link to="/build">Build</Link>
        <Link to="/connect">Connect</Link>
        <a href="/logout">Log Out</a>
      </div>
      : <div>
        <a className="oauth-container btn darken-4 white black-text" href='/google' style={{textTransform: 'none'}}>
            <div className="left">
              <img width="20px"  alt="Google sign-in" 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
            </div>
        Login with Google
          </a>
      </div>
    }
    <Switch>
      <Route path='/home'>
        <Home/>
      </Route>
      <Route path='/build'>
        <Build />
      </Route>
      <Route path='/connect'>
        <Connect />
        </Route>
    </Switch>
      <div>

      </div>
    </div>
  )
}

export default NavBar;