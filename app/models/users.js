'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Tasks = new Schema({
totalTime:Number,
dates:[Number],
taskText:String,
tags:[String]


});
var User = new Schema({
	github: {
		id: String,
		displayName: String,
		username: String,
      publicRepos: Number
	},
   nbrClicks: {
      clicks: Number
   },
   testObj:{thing:Number},

taskList:[Tasks],
totalMins:Number
 



});

module.exports = mongoose.model('User', User);
