"use strict";

const express = require('express');
const cors = require('cors')
const app = express();
const user = require('./users.js');
const Galaxy = require('./Galaxy.js');
const galaxy = new Galaxy();
const {verifySign} = require('./middleware.js');

app.use(cors())
app.options('*', cors());
app.use(express.json());

app.get('/', (req, res, next) => {
  res.status(200).send("UP");
});

app.post('/user/login', (req, res, next) => {
  user.login(galaxy,req,res);
})

app.post('/user/create',(req,res,next) => {
  user.createUser(galaxy,req,res);
})

app.use((req,res,next)=>{
  verifySign(galaxy,req,res,next);
});

app.post('/user/info',(req,res,next)=>{
  user.userInfo(galaxy,req,res);
})

app.get('/user/list',(req,res,next) => {
  user.getAllUsers(galaxy,res);
})

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});