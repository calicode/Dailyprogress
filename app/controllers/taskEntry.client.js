(function(){


var timerState = {
started:false,
sessionTime:0

};
console.log("I have loazded");




document.getElementById("butStartTimer").onclick = startTimer;
document.getElementById("butEndWork").onclick = endWork;


function startTimer() {
console.log("start button clicked good job");

}


function endWork() {
/* once this is clicked I think we need to make a post request to the local host which server js will handle and put 
info into database after validating it. 

*/
console.log("end button clicked good job");

}



// 









})();