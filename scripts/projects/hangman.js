import {wordList} from "../../data/hangman.js"
let word = wordList[Math.floor(Math.random() * wordList.length)];

console.log(`Wordlist contains ${wordList.length} words`);
console.log(`${word} is the word`);

start();

//Detect key presses
document.onkeydown = detectLetter;

//Starts game
function start() {
    setGuesses();
    setWord();
    showMeaning();
}

//Adds list of letters
function setGuesses() {
    let child = document.getElementById("guesses").lastElementChild;
    while(child){
        game.removeChild(child);
        child = document.getElementById("guesses").lastElementChild;
    }

    let i = 0;
    for (let char of "abcdefghijklmnopqrstuvwxyz") {
        let element = document.createElement("div");
        let letter = document.createElement("p");
        letter.innerText = char.toUpperCase();
        element.appendChild(letter);
        i++ % 6 == 0 && document.getElementById("guesses").appendChild(document.createElement("br"));
        document.getElementById("guesses").appendChild(element);
    }
}

//Adds divs for word to guess
function setWord() {
    let child = document.getElementById("letters").lastElementChild;
    while(child){
        game.removeChild(child);
        child = document.getElementById("letters").lastElementChild;
    }

    for (let char of word) {
        let element = document.createElement("div");
        let letter = document.createElement("p");
        letter.innerText = char.toUpperCase();
        element.appendChild(letter);
        document.getElementById("letters").appendChild(element);
    }
}

//Links to word meaning
function showMeaning() {
    let link = document.createElement("a");
    link.setAttribute("id", "meaning");
    link.setAttribute("target", "_blank");
    link.setAttribute("href", `https://google.com/search?q=${word}+meaning`);
    link.innerText = "View meaning ➜";
    document.getElementsByClassName("word")[0].appendChild(link);
}

function detectLetter(e) {
    if ("abcdefghijklmnopqrstuvwxyz".indexOf(e.key.toLowerCase()) == -1) {
        return;
    }

    if (word.indexOf(e.key.toLowerCase()) != -1) {
        correct(e.key);
    } else {
        incorrect(e.key);
    }
}