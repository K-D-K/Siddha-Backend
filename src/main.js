"use strict";

const express = require('express');
const app = express();
const user = require('./users.js');
const Galaxy = require('./Galaxy.js');
const galaxy = new Galaxy();

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

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});