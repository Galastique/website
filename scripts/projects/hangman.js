import {wordList} from "../../data/hangman.js"
let word = wordList[Math.floor(Math.random() * wordList.length)];

start();

//Detect key presses
document.onkeydown = detectLetter;

//Starts game
function start() {
    document.getElementsByTagName("img")[0].src = "../../images/projects/hangman/state0.png";
    setGuesses();
    setWord();
}

//Adds list of letters
function setGuesses() {
    let child = document.getElementById("guesses").lastElementChild;
    while(child = document.getElementById("guesses").lastElementChild){
        document.getElementById("guesses").removeChild(child);
        child = document.getElementById("guesses").lastElementChild;
    }

    let i = 0;
    for (let char of "abcdefghijklmnopqrstuvwxyz") {
        let element = document.createElement("div");
        let letter = document.createElement("p");
        letter.innerText = char.toUpperCase();
        element.setAttribute("id", char);
        element.appendChild(letter);
        i++ % 6 == 0 && document.getElementById("guesses").appendChild(document.createElement("br"));
        document.getElementById("guesses").appendChild(element);
    }
}

//Adds divs for word to guess
function setWord() {
    let child = document.getElementById("letters").lastElementChild;
    while(child){
        document.getElementById("letters").removeChild(child);
        child = document.getElementById("letters").lastElementChild;
    }

    for (let char of word) {
        let element = document.createElement("div");
        let letter = document.createElement("p");
        element.appendChild(letter);
        document.getElementById("letters").appendChild(element);
    }
}

function detectLetter(e) {
    let key = e.key.toLowerCase();
    if ("abcdefghijklmnopqrstuvwxyz".indexOf(key) == -1) {
        return;
    }

    if (word.indexOf(key) != -1) {
        correct(key);
    } else {
        incorrect(key);
    }
}

//When guess is right
function correct(letter) {
    //Changes letter colors
    document.getElementById(letter) ? document.getElementById(letter).setAttribute("id", "right") : function(){return;};

    let instances = word.split(letter).length - 1;
    let lastInstance = 0;
    for(let i = 0; i < instances; i++) {
        document.getElementById("letters").getElementsByTagName("p")[word.indexOf(letter, lastInstance == 0 ? lastInstance : lastInstance + 1)].innerText = letter.toUpperCase();
        document.getElementById("letters").getElementsByTagName("div")[word.indexOf(letter, lastInstance == 0 ? lastInstance : lastInstance + 1)].setAttribute("id", "found");
        word.indexOf(letter, lastInstance) == 0 ? (lastInstance++) : (lastInstance = word.indexOf(letter, lastInstance + 1));
    }

    //Checks if word has been found
    let foundWord = "";
    for(let div of document.getElementById("letters").getElementsByTagName("p")){
        foundWord += div.innerText;
    }

    word == foundWord && victory();
}

//When guess is wrong
function incorrect(letter) {
    //Changes letter colors
    document.getElementById(letter).setAttribute("id", "wrong");

    //Changes image
    let string = document.getElementsByTagName("img")[0].src.split("/");
    let state = string[string.indexOf("hangman") + 1].charAt(5);
    state == 5 ? failure() : document.getElementsByTagName("img")[0].src = `../../images/projects/hangman/state${state - -1}.png`;
}

function victory() {
    //document.getElementsByTagName("img")[0].src = "../../images/projects/hangman/win.png";
    for(let div of document.getElementById("letters").getElementsByTagName("div")) {
        document.getElementById("letters").getElementsByTagName("div").setAttribute("id", "right");
    }
    showMeaning();
}

function failure() {
    document.getElementsByTagName("img")[0].src = "../../images/projects/hangman/state6.png";
    showMeaning();
}

//Links to word meaning
function showMeaning() {
    document.getElementById("meaning") && document.getElementById("meaning").remove();
    let link = document.createElement("a");
    link.setAttribute("id", "meaning");
    link.setAttribute("target", "_blank");
    link.setAttribute("href", `https://google.com/search?q=${word}+meaning`);
    link.innerText = "View meaning ➜";
    document.getElementsByClassName("word")[0].appendChild(link);
}