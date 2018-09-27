"use strict"

const {isUndefined} = require("./Utils.js");

const verifySign = (galaxy, req, res, next) => {
  let token = req.headers['x-access-token'];
  if(!isUndefined(token)) {
    let callbackFunction = (err,decoded) => {
      if (err) {
        return res.status(400).send({ success: false, message: "Failed to authenticate token." });
      } else {
        req.decoded = decoded;
        next();
      }
    }
    galaxy.jwtVerify(token,callbackFunction);
  } else {
    res.status(400).send({success: false , message : "Token not found in payload"})
  }
}

exports.verifySign = verifySign;