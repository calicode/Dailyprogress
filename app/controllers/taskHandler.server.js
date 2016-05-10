'use strict';
var parser = require('body-parser');
var Users = require('../models/users.js');

function TaskHandler(){

	this.logtask = function(req,res){

		console.log("request came in", req.body);

}


}


module.exports = TaskHandler;