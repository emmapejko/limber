import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';
let io = require('socket.io');

const socket = io.connect("http://localhost:3000");


function Connect () {

  console.log('connect');

  return (
    <div>
      Connect
    </div>
  )
}
export default socket;
export default Connect;