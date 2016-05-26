(function(){
'use strict';

var timerState = {
started:false,
sessionTime:0,
startTime:0,
activeHours:[],
tags:[],
startDate:0,
endDate:0,

getMinutes: function(){
	return Math.ceil(this.sessionTime / 60); 	
	},
resetState: function(){
	this.started = false;
	this.sessionTime = 0;
	this.startTime = 0;
	this.startDate = 0;
	this.endDate = 0;
	this.tags=[];
	$('#taskNotes').val("");
	}
};


var vm = new Vue({
  el: '#task_list',
  data: {
    taskListResults: 'Hello Vue.js!'
  }
});



document.getElementById("butStartTimer").onclick = startTimer;
document.getElementById("butEndWork").onclick = endWork;
document.getElementById("butUpdateTasks").onclick = updateTasks;

function startTimer() {

if (timerState.started){
	
	console.log("Stopping timer at ", new Date());
	timerState.started = false;
	timerState.endDate = new Date().getTime();
	let timeTemp = (timerState.endDate) - (timerState.startDate);
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
	timerState.startDate = new Date().getTime();
	let niceTime = new Date(timerState.startDate);

	niceTime = "Started at: "+ (niceTime.getHours() %12 || 12) + ":" + (niceTime.getMinutes()  > 9 ? niceTime.getMinutes() : "0" + niceTime.getMinutes() ); 
	niceTime = niceTime + " Current session has lasted " + timerState.getMinutes() +" minutes";
console.log(niceTime);
	$('#startDisplay').text(niceTime);


}

}


function endWork() {
/* once this is clicked I think we need to make a post request to the local host which server js will handle and put 
info into database after validating it. 

*/



function makePost(){
vm.taskListResults = "makepost was clicked and updated the view";
if (timerState.sessionTime && ( $('#taskNotes').val() ) ){   
let minutes = +timerState.getMinutes();
let taskInfo = {totalTime:minutes,
		taskDetails:$('#taskNotes').val(),
		startDate:timerState.startDate,
		endDate:timerState.endDate


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
		
		.done(function(){console.log("successfully  sent to server");
timerState.resetState();
	})
		.fail(function(jqHxr,error,error_internal){console.log("Error sending to server, oh bother", error_internal);});

		

		} else if (!timerState.sessionTime) {
			alert("Total session time is 0 minutes, you should probably do some work!");}
		else if (!$('#taskNotes').val()) {
			alert("Task notes are blank, what did you do today?");
		}

}

if (!timerState.started){
	makePost();
	console.log("Session time was ", timerState.getMinutes()," minutes ");
	console.log(timerState.sessionTime, "seconds");
	
	let formVal = document.getElementById("taskNotes");
	
	
}
else if (timerState.started){
	
	console.log("Session time was ", timerState.getMinutes()," minutes ");
	console.log(timerState.sessionTime, "seconds");
	timerState.endDate = new Date().getTime();
	let timeTemp = (timerState.endDate) - (timerState.startDate);
	
	timerState.sessionTime = +timerState.sessionTime + ( (timeTemp / 600) );
	timerState.sessionTime = +timerState.sessionTime.toFixed();

	makePost();

	let formVal = document.getElementById("taskNotes");
	
	}
}








function updateTasks(){
	$.get("http://127.0.0.1:8080/tasks")
	.fail(function(error){console.log("Error getting tasks", error); })
	.done(function(data){
		console.log("meow" , data); 
		vm.taskListResults = JSON.stringify(data);} );
	
}







})(); 