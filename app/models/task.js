var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Task = new Schema({
taskText:String,
totalTime:Number,
dates:[String],
tags:[String],
github:{id:String,username:String}


});


module.exports =  mongoose.model('Task',Task);
