let ongoing = "no";
let timeLimit;
let ongoingTest;
let results = [];
let startTime = 0;

//Checks if test is running on click
document.getElementsByTagName("html")[0].onmousedown = function (event) {
    let div = event.target;

    if(div.id == "back"){
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
    let endTime = performance.now();
    document.body.style.backgroundColor = "RGB(80, 80, 240)";
    clearTimeout(ongoingTest);
    clearTimeout(timeLimit);
    ongoing = "no";

    if(!failed){
        if(startTime > endTime){
            document.getElementById("title").innerHTML = "You clicked too soon!";
        }else{
            results.push(Math.round(endTime - startTime));
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
    startTime = performance.now();
    timeLimit = setTimeout(function() {stop(true)}, 2000);
}

//Changes text values
function changeValues(){
    document.getElementById("rules").innerHTML = "";
    document.getElementById("result").innerHTML = `Result: ${results[results.length - 1]}ms`;

    if(results.length > 1) {
        document.getElementById("min").innerHTML = `Fastest: ${Math.min.apply(null, results)}ms`;
        document.getElementById("max").innerHTML = `Slowest: ${Math.max.apply(null, results)}ms`;
        document.getElementById("average").innerHTML = `Average: ${Math.round(results.reduce((a, b) => a + b, 0) / results.length)}ms`;
        document.getElementById("amount").innerHTML = `Number of tests: ${results.length}`;
    }
}