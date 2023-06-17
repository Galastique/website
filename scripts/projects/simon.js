//Global variables
const startButton = document.getElementsByTagName("button")[0];
const soundGreen = document.getElementsByTagName("audio")[0];
const soundRed = document.getElementsByTagName("audio")[1];
const soundYellow = document.getElementsByTagName("audio")[2];
const soundBlue = document.getElementsByTagName("audio")[3];
const soundFailure = document.getElementsByTagName("audio")[4];
soundFailure.volume = 0.2;
const sounds = [soundGreen, soundRed, soundYellow, soundBlue, soundFailure];
let started = false;
let score = -1;
addPoint();

//Detects clicks
document.getElementById("simon").onmouseup = function(event) {
    let div = event.target;
    if (!started || !playerTurn || event.button != 0 || div.id == "simon") {
        return;
    }

    //Compares player inputs with pattern
    blink(div.id)
    listenedPattern.push(div.id);
    let lenComputer = patternList.length;
    let lenPlayer = listenedPattern.length;

    if (JSON.stringify(listenedPattern) == JSON.stringify(patternList.slice(0, lenPlayer))) {
        if (lenComputer == lenPlayer) {
            addPoint();
            setTimeout(playPattern, 1000);
            playerTurn = false;
        }
    } else {
        failure();
    }
}

//Starts game
function start() {
    started = true;
    playerTurn = false;
    patternList = [];
    score = 0;
    document.getElementsByTagName("button").length > 0 && document.getElementsByTagName("button")[0].remove();
    while(document.getElementsByClassName("disabled").length > 0) {
        document.getElementsByClassName("disabled")[0].classList.remove("disabled");
    }

    setTimeout(playPattern, 800);
}

//Blinks button
function blink(divId) {
    let colorIndex = ["green", "red", "yellow", "blue"].indexOf(divId);
    playSound(colorIndex);
    let imageDiv = document.getElementsByTagName("img")[colorIndex];
    imageDiv.classList.remove("blink");
    setTimeout(function(){imageDiv.classList.add("blink");}, 1);
    imageDiv.addEventListener("animationend", function() {imageDiv.classList.remove("blink")}, false);
}

//Plays a sound
function playSound(colorIndex) {
    sounds[colorIndex].pause();
    sounds[colorIndex].currentTime = 0;
    sounds[colorIndex].volume = 0.1;
    sounds[colorIndex].play();
}

//Adds a new color to the pattern
async function playPattern() {
    playerTurn = false;
    let newColor = ["green", "red", "yellow", "blue"][Math.floor(Math.random() * 4)];
    let index = 0;
    patternList.push(newColor);

    for (let color of patternList) {
        blink(color);
        await new Promise(r => setTimeout(r, 500));
    }

    playerTurn = true;
    listenedPattern = [];
}

//When successful sequence
function addPoint() {
    score++;
    let savedHighScore = localStorage.getItem("simon");
    let highScore;

    if(!savedHighScore){
        highScore = 0;
        localStorage.setItem("simon", JSON.stringify({"highScore": 0}));
    } else {
        highScore = JSON.parse(savedHighScore).highScore;
    }
    
    if(score > JSON.parse(savedHighScore).highScore){
        console.log("tesT");
        highScore = score;
        localStorage.setItem("simon", JSON.stringify({"highScore": highScore}));
    }

    document.getElementById("currentScore").innerText = `Current score: ${score}`;
    document.getElementById("bestScore").innerText = `Best score: ${highScore}`;
}

//When unsuccessful sequence
async function failure() {
    //Shows failure
    started = false;
    playerTurn = false;
    score = -1;
    sounds[4].play();
    for (let color of ["green", "red", "yellow", "blue"]){
        let imageDiv = document.getElementsByTagName("img")[["green", "red", "yellow", "blue"].indexOf(color)];
        imageDiv.classList.contains("failureBlink") && imageDiv.classList.remove("failureBlink");
        setTimeout(function(){imageDiv.classList.add("failureBlink");}, 5);
        imageDiv.addEventListener("animationend", function() {imageDiv.classList.remove("failureBlink")}, false);
    }

    //Resets game
    setTimeout(function(){
        document.getElementsByClassName("game")[0].appendChild(startButton);
        document.getElementById("currentScore").innerText = "Current score: 0";
        addPoint();
        for (let image of document.getElementsByTagName("img")) {
            image.classList.add("disabled");
        }
    }, 1000);
}