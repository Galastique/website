//Global variables
const soundGreen = document.getElementsByTagName("audio")[0];
const soundRed = document.getElementsByTagName("audio")[1];
const soundYellow = document.getElementsByTagName("audio")[2];
const soundBlue = document.getElementsByTagName("audio")[3];
const sounds = [soundGreen, soundRed, soundYellow, soundBlue];

//Detects clicks
document.getElementById("simon").onmouseup = function(event) {
    let div = event.target;
    if (!started || !playerTurn || event.button != 0 || div.id == "simon") {
        return;
    }

    blink(div.id)
    playSound(colorIndex);
}

//Starts game
function start() {
    started = true;
    playerTurn = false;
    patternList = [];
    document.getElementsByTagName("button") && document.getElementsByTagName("button")[0].remove();
    while(document.getElementsByClassName("disabled").length > 0) {
        document.getElementsByClassName("disabled")[0].classList.remove("disabled");
    }

    setTimeout(playPattern, 800);
}

//Blinks button
function blink(divId) {
    let colorIndex = ["green", "red", "yellow", "blue"].indexOf(divId);
    let imageDiv = document.getElementsByTagName("img")[colorIndex];
    imageDiv.classList.contains("blink") && imageDiv.classList.remove("blink");
    setTimeout(function(){imageDiv.classList.add("blink");}, 1);
    imageDiv.addEventListener("animationend", function() {imageDiv.classList.remove("blink")}, false);
}

//Plays a sound
function playSound(colorIndex) {
    sounds[colorIndex].pause();
    sounds[colorIndex].currentTime = 0;
    sounds[colorIndex].play();
}

//Adds a new color to the pattern
async function playPattern() {
    playerTurn = false;
    let newColor = ["green", "red", "yellow", "blue"][Math.floor(Math.random() * 4)];
    patternList.push(newColor);

    for (let color of patternList) {
        blink(color);
        await new Promise(r => setTimeout(r, 600));
    }

    listenPattern();
}

function listenPattern() {
    playerTurn = true;
    let listenedPattern = [];
}