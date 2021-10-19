import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import skelly from '../images/skellyton.png'

function Build () {
  const { path, url } = useRouteMatch();
  const [view, setView] = useState('main');

  const occupationClick = () => {
    console.log('occupationClick');
    setView('occupation');
  }

  const bodyClick = () => {
    console.log('bodyClick');
    setView('body');
  }

  const renderView = () => {
    if (view === 'main') {
      return (
        <>
          <Button variant="contained" disableElevation onClick={occupationClick}>
            build a flow based on your occupation
          </Button>
          <Button variant="contained" disableElevation onClick={bodyClick}>
            build a flow focusing on a body part
          </Button>
        </>
      )
    } else {
      return (
        <img src={skelly} />
      )
    }
  }


  return (
    <div>
      {/* <Button variant="contained" disableElevation onClick={occupationClick}>
        build a flow based on your occupation
      </Button>
      <Button variant="contained" disableElevation onClick={bodyClick}>
        build a flow focusing on a body part
      </Button> */}
      {renderView()}
    </div>
  )
}

export default Build;