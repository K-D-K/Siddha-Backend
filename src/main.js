"use strict";

const express = require('express');
const app = express();
const user = require('./users.js');
const DB = require('./DB.js');
const db = new DB();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.status(200).send("UP");
});

app.post('/login', (req, res, next) => {
  user.login(db,req,res);
})

app.post('/createUser',(req,res,next) => {
  user.createUser(db,req,res);
})

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});