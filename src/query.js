"use strict";

const {isUndefined , isObject, isArray , forceParseJSON} = require("./Utils.js");

/*
 * This function will take table name and data that need to inserted in table in following formats
 * Objects : Array of JSON that need to insert in table
 *         : JSON that need to insert in table
 * String  : Stringified JSON or Array Objects that need to insert in table
 */
const insertWithError = (galaxy, tableName, data , callback) => {

  /*
   * This condition is to check whether data is string .
   * If it is string . It will hardparse that string to object .
   * If it is not a valid string to hard parse string to object it will throw error
   */
  if(!isObject(data)){
    try{
      data = forceParseJSON(data);
    } catch(error){
      console.log("Error while parsing data : ",error.toString());
      throw (new Error("Error while parsing string data , Expecting Object or Stringfied Object"));
    }
  }

  if(!isArray(data)){
    /*
     * The reason for not using new Array is performance enhancement
     * for further reference please visit here : "https://stackoverflow.com/questions/7375120/why-is-arr-faster-than-arr-new-array"
     */
    data = [data];
  }

  let keys = {};
  /*
   * This iteration is to find list of insertions keys that send in payload
   */
  data.map(json => {
    if(isObject(json) && (!isArray(json))){
      for(let key in json){
        keys[key] = 1;
      }
    } else {
      throw (new Error("Data that need to be inserted was not in expected formats"));
    }
  });


  if(Object.keys(keys).length == 0){
    throw (new Error("Object should have atLeast one field to insert in table"));
  }
  let queryStr = "insert into " + tableName + ' (' + Object.keys(keys).join(",") + ') values ';

  /*
   * This piece of code is used to create set of values that need to inject in query .
   * Final set should look like this [(value1,value2,value3,...) , (value1,value2,value3,...) , (value1,value2,value3,...)]
   */
  data.map(json => {
    queryStr += '(';
    for(let key in keys){
      let value = json[key];
      if(!isUndefined(value)){
        if(isObject(value)){
          value = JSON.stringify(value);
        }
        if(typeof value == "string"){
          queryStr += ("'" + value + "'");
        } else {
          queryStr += value;
        }
      }
      queryStr += " ,";
    }
    queryStr = queryStr.slice(0,queryStr.length-1);
    queryStr += ") ,";
  })
  queryStr = queryStr.slice(0,queryStr.length-1);

  // making DB call
  galaxy.getDb().execute(queryStr,callback);
};

exports.insertWithError = insertWithError;