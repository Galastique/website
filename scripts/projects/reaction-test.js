let ongoing = "no";
let timeLimit;
let ongoingTest;
let results = [];
let startTime = 0;

//Checks if test is running on click
document.getElementsByTagName("html")[0].onmousedown = function (event) {
    let div = event.target;

    if (div.id == "back") {
        return;
    }

    if(ongoing != "no"){
        stop();
    }else{
        start();
    }
}

//Stops test
function stop(failed = false){
    let endTime = Date.now();
    document.body.style.backgroundColor = "RGB(80, 80, 240)";
    clearTimeout(ongoingTest);
    clearTimeout(timeLimit);
    ongoing = "no";

    if(!failed){
        if(startTime > endTime){
            document.getElementById("title").innerHTML = "You clicked too soon!";
        }else{
            results.push(endTime - startTime);
            document.getElementById("title").innerHTML = "Click to test again";
            changeValues();
        }
    }else{
        document.getElementById("title").innerHTML = "You were too slow!";
    }
}

//Starts test
function start(){
    document.body.style.backgroundColor = "RGB(200, 80, 80)";
    document.getElementById("title").innerHTML = "Wait for green...";
    ongoing = "waiting";
    startTime = 999999999999999;
    let timeout = (Math.random() * 5 + 1.2) * 1000;
    ongoingTest = setTimeout(test, timeout);
}

//Counts reaction time
function test(){
    document.body.style.backgroundColor = "RGB(100, 180, 100)";
    document.getElementById("title").innerHTML = "Click!";
    ongoing = "yes";
    startTime = Date.now();
    timeLimit = setTimeout(function() {stop(true)}, 2000);
}

//Gets average value of results
function averageTime(results){
    let sum = 0;
    for(let i = 0; i < results.length; i++){
        sum += results[i];
    }
    return Math.round(sum / results.length);
}

//Changes text values
function changeValues(){
    let result = results[results.length - 1];
    let min = Math.min.apply(null, results);
    let max = Math.max.apply(null, results);
    let average = averageTime(results);
    let count = results.length;
    document.getElementById("rules").innerHTML = "";
    document.getElementById("result").innerHTML = `Result: ${result.toString()}ms`;
    document.getElementById("min").innerHTML = `Fastest: ${min.toString()}ms`;
    document.getElementById("max").innerHTML = `Slowest: ${max.toString()}ms`;
    document.getElementById("average").innerHTML = `Average: ${average.toString()}ms`;
    document.getElementById("amount").innerHTML = `Amount: ${count.toString()}`;
}