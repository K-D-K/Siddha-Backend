"use strict";

const express = require('express');
const app = express();
const user = require('./users.js');
const DB = require('./DB.js');
const db = new DB();

app.use(express.json());

app.get('/', (req, res, next) => {

});

app.post('/createUser',(req,res,next) => {
  user.createUser(db,req,res);
})

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});