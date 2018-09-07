"use strict";

const pg = require("pg");
const {dbConfig} = require('./config.js');
const {isUndefined, Success , convertToError} = require("./Utils.js");

class DataBase{

  constructor(){
    this.pool = new pg.Pool(dbConfig);
  }

  execute(command,callback){
    this.pool.connect(function (err, client, done) {
      if (!isUndefined(err)) {
        callback(convertToError(err));
      } else {
        client.query(command, function (err, result) {
          done();
          if (!isUndefined(err)) {
            callback(convertToError(err));
          } else {
            callback(new Success(result.rows));
          }
        })
      }
    })
  }
}

module.exports = DataBase;