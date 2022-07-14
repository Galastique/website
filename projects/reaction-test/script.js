let ongoing = "no";
let ongoingTest;
let results = [];
let startTime = 0;

//Checks if test is running
function timer(){
    if(ongoing != "no"){
        stop();
    }else{
        start();
    }
}

//Stops test
function stop(){
    let endTime = Date.now();
    clearTimeout(ongoingTest);
    document.body.style.backgroundColor = "RGB(0, 80, 240)";
    ongoing = "no";

    //If click before green
    if(startTime > endTime){
        document.getElementById("title").innerHTML = "You clicked too soon!";
    }else{
        let time = endTime - startTime;
        results.push(time);
        document.getElementById("title").innerHTML = "Click to test again";
        changeValues();
    }
}

//Starts test
function start(){
    document.getElementById("title").innerHTML = "Wait for green...";
    document.body.style.backgroundColor = "RGB(200, 40, 40)";
    ongoing = "waiting";
    startTime = 999999999999999;

    let interval = (Math.random() * 5 + 1.2) * 1000;
    ongoingTest = setTimeout(test, interval);
}

//Counts reaction time
function test(){
    document.body.style.backgroundColor = "RGB(40, 200, 40)";
    startTime = Date.now();
    ongoing = "yes";
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
    //Gets values
    let result = results[results.length - 1];
    let min = Math.min.apply(null, results);
    let max = Math.max.apply(null, results);
    let average = averageTime(results);
    let count = results.length;

    //Changes displayed values
    document.getElementById("rules").innerHTML = "";
    document.getElementById("result").innerHTML = `Result: ${result.toString()}ms`;
    document.getElementById("min").innerHTML = `Fastest: ${min.toString()}ms`;
    document.getElementById("max").innerHTML = `Longest: ${max.toString()}ms`;
    document.getElementById("average").innerHTML = `Average: ${average.toString()}ms`;
    document.getElementById("amount").innerHTML = `Amount: ${count.toString()}`;
}