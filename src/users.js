"use strict";

const {extractError, Success ,isUndefined ,convertObject ,getFirst ,isObject ,isArray} = require("./Utils.js");
const {insertWithError} = require("./query.js");

const createUser = (galaxy,req,res) => {
  let callBackFunction = response => {
    if(response instanceof Success){
      res.status(200).send("Data Inserted successfully");
    } else {
      res.status(400).send(extractError(response));
    }
  }
  try {
    insertWithError(galaxy,'userdetails',req.body.data,callBackFunction);
  } catch(exe){
    res.status(400).send(extractError(exe));
  }
}

const login = (galaxy,req,res) => {
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
    let query = "select * from userdetails where " + argument + " = '" + body[argument] + "' ;";
    let callBackFunction = response => {

      if(response instanceof Success){
        let userData = response.message;

        if(isArray(userData)){
          userData = userData[0];
        }

        if(isObject(userData) && userData.hasOwnProperty("password")){

          if(userData.password == body.password){
            let token = galaxy.jwtSign({"userId" : userData.id});
            let apiResp =
              { "token" : token
              , "login" : true
              , "time" : Date.now()
              }
            res.status(200).send(apiResp);
          } else {
            res.status(400).send("Login failed due to wrong password");
          }
        } else {
          res.status(400).send("Login failed while parsing password");
        }

      } else {
        res.status(400).send(extractError(response));
      }
    }

    galaxy.getDb().execute(query,callBackFunction);

  } else {
    res.status(400).send("Missing mandatory parameters");
  }
}

exports.createUser = createUser;
exports.login = login;