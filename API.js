"use strict";

const request = require('request');


module.exports = class API {
    
    constructor (baseurl, username, apikey) {
	
	this.baseurl = baseurl;
	this.username = username;
	this.apikey = apikey;
	
    }
    
    call(callback, action, params, method = 'GET') {
	
	var hmac = crypto.createHmac('sha256', this.apikey);
	hmac.update(action);
	
	var query = {
	    url: this.baseurl + action,
	    method: method,
	    json: true,
	    form: params,
	    headers: {
		"X-KNOWN-USERNAME": this.username,
		"X-KNOWN-SIGNATURE": hmac.digest('hex')
	    }
	};
	
	request(query, (err, res, body) => {
	    if (err) { 
		return console.error(err); 
	    }
	    if (('' + res.statusCode).match(/^5\d\d$/)) {
		console.error("EXCEPTION: " + body.exception.message);
		return;
	    }
	    
	    callback(body);
	}); 
    }
}