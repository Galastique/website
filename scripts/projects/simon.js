//Global variables
const startButton = document.getElementsByTagName("button")[0];
const soundGreen = document.getElementsByTagName("audio")[0];
const soundRed = document.getElementsByTagName("audio")[1];
const soundYellow = document.getElementsByTagName("audio")[2];
const soundBlue = document.getElementsByTagName("audio")[3];
const soundFailure = document.getElementsByTagName("audio")[4];
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
    listenedPattern.push(div.id);
    let lenComputer = patternList.length;
    let lenPlayer = listenedPattern.length;

    if (JSON.stringify(listenedPattern) == JSON.stringify(patternList.slice(0, lenPlayer))) {
        if (lenComputer == lenPlayer) {
            addPoint();
            setTimeout(playPattern, 1000);
            playerTurn = false;
        }
        blink(div.id)
    } else {
        failure();
    }
}

//Starts game
function start() {
    //Sets values to default
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
    for (let sound of sounds) {
        sound.pause();
        sound.currentTime = 0;
        colorIndex != 4 ? sound.volume = 0.1 : sound.volume = 0.08;
    }
    sounds[colorIndex].play();
}

//Adds a new color to the pattern
async function playPattern() {
    playerTurn = false;
    let newColor = ["green", "red", "yellow", "blue"][Math.floor(Math.random() * 4)];
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
    let highScore = 0;
    try {
        highScore = JSON.parse(localStorage.getItem("simon")).highScore;
    }catch(err){
        localStorage.setItem("simon", JSON.stringify({"highScore": 0}));
    }
    
    if(score > highScore){
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