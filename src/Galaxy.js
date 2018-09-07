"use strict"

const DB = require('./DB.js');
const jwt = require('jsonwebtoken');
const {encryptKey} = require('./config.js');

class Galaxy{
  constructor(){
    this.db = new DB();
  }

  getDb(){
    return this.db;
  }

  getJwt(){
    return jwt;
  }

  jwtSign(payload){
    return (jwt.sign(payload,encryptKey,{}));
  }
}

module.exports = Galaxy;