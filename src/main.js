"use strict";

const express = require('express');
const app = express();
const user = require('./users.js');
const Galaxy = require('./Galaxy.js');
const galaxy = new Galaxy();
const {verifySign} = require('./middleware.js');

app.use(express.json());

app.get('/', (req, res, next) => {
  res.status(200).send("UP");
});

app.post('/login', (req, res, next) => {
  user.login(galaxy,req,res);
})

app.post('/createUser',(req,res,next) => {
  user.createUser(galaxy,req,res);
})

app.use((req,res,next)=>{
  verifySign(galaxy,req,res,next);
});

app.post('/checkAPI',(req,res,next)=>{
  console.log(req.body,req.decoded);
})

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});