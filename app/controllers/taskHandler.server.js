'use strict';
var parser = require('body-parser');
var Users = require('../models/users.js');


// users.js above jhandles mongoose and using a schema.  Looks pretty straight forward 
// Trying to think of everything i would store in database. Minutes worked, task details, a unique id for the task details so that
// they can be served up in a dropdown list for easy access if numTimesUsed > 3ish
// storing epoch date also for easy conversion to show active days/times etc. tags would 
// tie to task id i think. 
function TaskHandler(){

	this.logtask = function(req,res){

		console.log("request came in", req.body);
		res.end("ok");

}


}


module.exports = TaskHandler;