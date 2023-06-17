//Global variables
const soundGreen = document.getElementsByTagName("audio")[0];
const soundRed = document.getElementsByTagName("audio")[1];
const soundYellow = document.getElementsByTagName("audio")[2];
const soundBlue = document.getElementsByTagName("audio")[3];
const sounds = [soundGreen, soundRed, soundYellow, soundBlue];
let started = false;

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
    playSound(["green", "red", "yellow", "blue"].indexOf(divId));
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
    sounds[colorIndex].volume = 0.1;
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
    
    while (listenedPattern.length < patternList.length && checkPattern(listenedPattern)) {
        //Detects clicks
        document.getElementById("simon").onmouseup = function(event) {
            let div = event.target;
            if (event.button != 0 || div.id == "simon") {
                return;
            }

            //Compares player inputs with pattern
            listenedPattern.push(div.id);
            blink(div.id)
        }
    }

    function checkPattern(pattern) {
        let len = pattern.length;
        console.log(pattern);
        console.log(patternList.slice(0, len));
        return true;
    }
}