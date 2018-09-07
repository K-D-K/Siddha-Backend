"use strict";

const {extractError, Success} = require("./Utils.js");
const {insertWithError} = require("./query.js");

const createUser = (dataBase,req,res) => {
  let callBackFunction = response => {
    if(response instanceof Success){
      res.status(200).send("Data Inserted successfully");
    } else {
      res.status(400).send(extractError(response));
    }
  }
  try {
    insertWithError(dataBase,'userdetails',req.body.data,callBackFunction);
  } catch(exe){
    res.status(400).send(extractError(exe));
  }
}


exports.createUser = createUser;