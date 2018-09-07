"use strict";

const pg = require("pg");
const {dbConfig} = require('./config.js');
const {isUndefined, Success} = require("./Utils.js");

class DataBase{

	constructor(){
		this.pool = new pg.Pool(dbConfig);
	}

	execute(command,callback){
		this.pool.connect(function (err, client, done) {
			if (!isUndefined(err)) {
				console.log("Can not connect to the DB" , err);
				callback(new Error("can not connect to DB"));
			} else {
	   		client.query(command, function (err, result) {
	      	done();
	      	if (!isUndefined(err)) {
	        	console.log("can not execute command on DB" , err);
	        	callback(new Error("can not execute command on DB"));
	      	} else {
	      		callback(new Success(result.rows));
	      	}
	   		})
	   	}
  	})
	}
}

module.exports = DataBase;