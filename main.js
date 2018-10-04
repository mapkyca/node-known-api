"use strict"; // Use ES6

var pjson = require('./package.json');
var API = require("./API.js");
var apicaller = new API(pjson.baseurl, pjson.username, pjson.apikey);

