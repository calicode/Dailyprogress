(function(){
'use strict';
// 5-30-2016 this file is too large. put makepost/gettasks into ajax functions script. Put rest of timer stuff into timer controller. 
const baseUrl = window.location.hostname + ":8080";

document.getElementById("butStartTimer").onclick = startTimer;
document.getElementById("butEndWork").onclick = endWork;
document.getElementById("butUpdateTasks").onclick = getWeeklyTotal;



// sett up vue.js bindings. 

var vm = new Vue({
  el: '#task_list',
  data: {
    taskListResults: '',
    weeklyTotal:getWeeklyTotal()
  }
});

var vmTimeDisplay = new Vue ({
el:'#schedule_top',
data:{
message: timerState.getDisplayMessage()
}
});


function displayUpdate(){

	vmTimeDisplay.message = timerState.getDisplayMessage();
}





function startTimer() {

if (timerState.started){

	window.clearInterval(timerState.displayUpdateInterval);
	console.log("Stopping timer at ", new Date());
	timerState.started = false;
	timerState.endDate = new Date().getTime();
	let timeTemp = timerState.endDate - timerState.startDate;
	// + in front of the timerstate changes type into number. 
	timerState.sessionTime = +timerState.sessionTime + (timeTemp / 600);
	timerState.sessionTime = +timerState.sessionTime.toFixed();
	timerState.startTime = 0; 
// resets just the start time back to 0 so user can continue with the same session states. Re-evaluate this at time point. 
// add display notification to indicate whats going on 'session time is 45 mins, timer stopped'. Make sure it restarts and adds
// correctly. Write automated test to do this. 

	

}

else if (!timerState.started) {	
	console.log("Started");

	timerState.started = true;
	timerState.startDate = new Date().getTime();
	displayUpdate();
	
}

if (!timerState.displayUpdateInterval) { 

	timerState.displayUpdateInterval = window.setInterval(displayUpdate,60000);	
		}

	} // end startTimer()




function endWork() {
/* once this is clicked I think we need to make a post request to the local host which server js will handle and put 
info into database after validating it. 

*/


//handles sending data to the server 


function makePost(){
vm.taskListResults = "makepost was clicked and updated the view";
if (timerState.sessionTime && ( $('#taskNotes').val() ) ){   
let minutes = +timerState.getMinutes();
let taskInfo = {totalTime:minutes,
		taskDetails:$('#taskNotes').val(),
		startDate:timerState.startDate
	


		};
		$.post({
			url: "http://"+baseUrl+"/schedule",
			
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


//handles different timer states. 
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








function getWeeklyTotal(){
	alert(location);
	$.get("http://"+baseUrl+"/weektotal")
	.fail(function(error){console.log("Error getting tasks", error); })
	.done(function(data){
		console.log("meow2" , data); 
		
	
	} );
	
}





function updateTasks(){
	$.get("http://"+baseUrl+"/weektotal")
	.fail(function(error){console.log("Error getting tasks", error); })
	.done(function(data){
		console.log("meow" , data); 
		vm.taskListResults = data;
	
	} );
	
}


function getWeeklyTotal(){
	$.get("http://"+baseUrl+"/weektotal")
	.fail(function(error){console.log("Error getting tasks", error); })
	.done(function(data){
		console.log("meow" , data); 
		vm.weeklyTotal = data[0].count;
	
	} );
	
}








})(); 
