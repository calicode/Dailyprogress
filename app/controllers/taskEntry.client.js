(function(){


var timerState = {
started:false,
sessionTime:0,
startTime:0
};
console.log("I have loazded");




document.getElementById("butStartTimer").onclick = startTimer;
document.getElementById("butEndWork").onclick = endWork;

function startTimer() {
if (timerState.started){
	
	console.log("Stopping timer at ", new Date());
	timerState.started = false;
	let timeTemp = (new Date().getTime()) - (timerState.startTime);
	timerState.sessionTime = timerState.sessionTime + ( (timeTemp / 600) /  60 );
	timerState.sessionTime = +timerState.sessionTime.toFixed();
	timerState.startTime = 0; 
	console.log("sessionTime is now ", timerState.sessionTime, " minutes");

}

else if (!timerState.started) {
	console.log("Starting timer at ", new Date());
	console.log("timer not started, turning on");
	timerState.started = true;
	timerState.startTime = new Date().getTime();	
}

}


function endWork() {
/* once this is clicked I think we need to make a post request to the local host which server js will handle and put 
info into database after validating it. 

*/
console.log("end button clicked good job");

}



// 









})();