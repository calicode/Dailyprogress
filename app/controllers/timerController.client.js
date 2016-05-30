// Put timer handling in this file. Keep state, update view etc. 
'use strict';

var timerState = {
started:false,
sessionTime:0,
startTime:0,
activeHours:[],
tags:[],
startDate:0,
endDate:0,
displayUpdateInterval:0,

getMinutes: function(){
	return Math.ceil(this.sessionTime / 60); 	
	},

getDuration:function(){
let currTime = new Date().getTime();
let elapsed =  Math.ceil ( (currTime - this.startDate) / 1000/60) ;
return elapsed;	
},

getDisplayMessage:function(){
let message = this.started ? 'Started at ' + this.getNiceTime() + ' running for ' + this.getDuration() + ' minutes '  : 'No session stated yet';
return message;
},
resetState: function(){
	this.started = false;
	this.sessionTime = 0;
	this.startTime = 0;
	this.startDate = 0;
	this.endDate = 0;
	this.tags=[];
	this.displayUpdateInterval = 0;
	$('#taskNotes').val("");
	},

getNiceTime :function(){
let niceTime = new Date(this.startDate);
/// creates a nice time string  with 0 pads and am/pm e.x 12:35 AM or 01:09 PM using a bunch of ternaries 
niceTime =  (niceTime.getHours() %12 || 12) + ":" + (niceTime.getMinutes()  > 9 ? niceTime.getMinutes() : "0" + niceTime.getMinutes() ) + ( niceTime.getHours() < 12 ? " AM" : " PM"   ); 
return niceTime;
	
}
};


