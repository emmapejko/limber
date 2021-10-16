const express = require('express');
const ClientId = express.Router();
const cId = require('dotenv').config();

// ClientId.get('/', (req, res) => {
//   res.status(201).send(cId);
// })
ClientId.get('/', async (req, res) => {
  
  try {
    
    res.status(201).send(cId);
  } catch (err) {
    console.log(err);
  }
});  


module.exports = {ClientId};