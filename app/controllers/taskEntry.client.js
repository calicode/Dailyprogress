(function(){
'use strict';

var timerState = {
started:false,
sessionTime:0,
startTime:0,
activeHours:[],
tags:[],

getMinutes: function(){
	return Math.ceil(this.sessionTime / 60); 	
	},
resetState: function(){
	this.started = false;
	this.sessionTime = 0;
	this.startTime = 0;
	this.startDateString = 0;
	this.endDateString = 0;
	this.tags=[];
	}
};




document.getElementById("butStartTimer").onclick = startTimer;
document.getElementById("butEndWork").onclick = endWork;

function startTimer() {

if (timerState.started){
	
	console.log("Stopping timer at ", new Date());
	timerState.started = false;
	timerState.endDateString = new Date();
	let timeTemp = (timerState.endDateString.getTime()) - (timerState.startDateString.getTime());
	timerState.sessionTime = +timerState.sessionTime + ( (timeTemp / 600) );
	timerState.sessionTime = +timerState.sessionTime.toFixed();
	timerState.startTime = 0; 
	console.log(timerState.sessionTime);
	console.log("sessionTime is now ", timerState.getMinutes(), " minutes");

}

else if (!timerState.started) {
	console.log("Starting timer at ", new Date());
	console.log("timer not started, turning on");
	timerState.started = true;
	timerState.startDateString = new Date();
	timerState.startTime = timerState.startDateString.getTime();

}

}


function endWork() {
/* once this is clicked I think we need to make a post request to the local host which server js will handle and put 
info into database after validating it. 

*/


	function makePost(){
let minutes = +timerState.getMinutes();
let taskInfo = {totalTime:minutes,
		taskDetails:$('#taskNotes').val(),
		startDateString:timerState.startDateString,
		endDateString:timerState.endDateString


		};
		$.post({
			url: "http://127.0.0.1:8080/schedule",
			statusCode:{
			404:function(){alert("File not found");}

			},
			type:'POST',
			data:JSON.stringify(taskInfo),
			contentType:"application/json"
			



		})
		
		.done(function(){console.log("successfully  sent to server");})
		.fail(function(jqHxr,error,error_internal){console.log("Error sending to server, oh bother", error_internal);});

		/*var xhttp = new XMLHttpRequest();
		
		xhttp.open("POST", "/schedule",true);
		xhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");
		xhttp.send(JSON.stringify({totalTime:minutes,taskDetails:formVal}));*/

}

if (!timerState.started){
	makePost();
	console.log("Session time was ", timerState.getMinutes()," minutes ");
	console.log(timerState.sessionTime, "seconds");
	timerState.resetState();
	let formVal = document.getElementById("taskNotes");
	console.log(formVal.value);
	
}
else if (timerState.started){
	
	console.log("Session time was ", timerState.getMinutes()," minutes ");
	console.log(timerState.sessionTime, "seconds");
	timerState.endDateString = new Date();
	let timeTemp = (timerState.endDateString.getTime()) - (timerState.startDateString.getTime());
	
	timerState.sessionTime = +timerState.sessionTime + ( (timeTemp / 600) );
	timerState.sessionTime = +timerState.sessionTime.toFixed();

	makePost();
	timerState.resetState();
	let formVal = document.getElementById("taskNotes");
	console.log(formVal.value);
	}
}















})();