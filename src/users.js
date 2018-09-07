"use strict";

const {extractError, Success ,isUndefined ,convertObject ,getFirst ,isObject ,isArray} = require("./Utils.js");
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

const login = (dataBase,req,res) => {
  let body = req.body;
  if(isUndefined(body)){
    res.status(400).send("Body is error while trying to parse data for login");
    return;
  }
  try {
    body = convertObject(body);
  } catch(exe){
    res.status(400).send(extractError(exe));
  }
  if(body.hasOwnProperty("password") && (body.hasOwnProperty("email") || body.hasOwnProperty("mobileNumber"))){
    let argument = getFirst(body,["email","mobileNumber"]);
    let query = "select password from userdetails where " + argument + " = '" + body[argument] + "' ;";
    let callBackFunction = response => {
      if(response instanceof Success){
        let password = response.message;
        if(isArray(password)){
          if(password[0].hasOwnProperty("password")){
            password = password[0]["password"];
          } else {
            res.status(400).send("Login failed while parsing password");
          }
        } else if(isObject(password)&&password.hasOwnProperty("password")){
          password = password.password;
        }
        if(password == body.password){
          res.status(200).send("Login Successful");
        } else {
          res.status(400).send("Login failed due to wrong password");
        }
      } else {
        res.status(400).send(extractError(response));
      }
    }
    dataBase.execute(query,callBackFunction);
  } else {
    res.status(400).send("Missing mandatory parameters");
  }
}

exports.createUser = createUser;
exports.login = login;