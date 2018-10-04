"use strict"; // Use ES6

var pjson = require('./package.json');
var API = require("./API.js");
var apicaller = new API(pjson.baseurl, pjson.username, pjson.apikey);


apicaller.call(function(body){
    console.log(body);
}, '/status/edit', {
    body: 'This is a test message'
}, 'POST');