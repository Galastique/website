import {wordList} from "../../data/hangman.js"
let word;
let dead = false;

//Event listeners
document.onkeydown = detectLetter;
document.getElementById("guesses").onmouseup = detectLetter;
document.getElementById("length").onchange = start;

//Adds options to drop down list
let dropDown = document.getElementById("length");
for (let i = 15; i > 2; i--) {
    let item = document.createElement("option");
    item.text = i;
    dropDown.add(item, 1);
}

start();

//Starts game
function start() {
    document.getElementById("playAgain") && document.getElementById("playAgain").remove();
    document.getElementById("meaning") && document.getElementById("meaning").remove();
    document.getElementsByTagName("img")[0].src = "../../images/projects/hangman/state0.png";

    let wordLength = document.getElementById("length").value;
    document.getElementById("length").blur();

    if (wordLength == "random") {
        word = wordList[Math.floor(Math.random() * wordList.length)];
    } else {
        do {
            word = wordList[Math.floor(Math.random() * wordList.length)];
        } while ((wordLength == "16plus" && word.length < 16) || (wordLength != "16plus" && word.length != wordLength));
    }
    
    setGuesses();
    setWord();
    dead = false;
}

//Adds list of letters
function setGuesses() {
    document.getElementById("guesses").innerHTML = "";

    let i = 0;
    for (let char of "abcdefghijklmnopqrstuvwxyz") {
        let element = document.createElement("div");
        let letter = document.createElement("p");
        letter.innerText = char.toUpperCase();
        letter.setAttribute("id", char);
        element.appendChild(letter);
        i++ % 6 == 0 && document.getElementById("guesses").appendChild(document.createElement("br"));
        document.getElementById("guesses").appendChild(element);
    }
}

//Adds divs for word to guess
function setWord() {
    document.getElementById("letters").innerHTML = "";

    for (let char of word) {
        let element = document.createElement("div");
        let letter = document.createElement("p");
        element.appendChild(letter);
        document.getElementById("letters").appendChild(element);
    }
}

//Detect inputs
function detectLetter(e) {
    //Keyboard
    if (e.type == "keydown") {
        let letter = e.key.toLowerCase();
        if (dead || "abcdefghijklmnopqrstuvwxyz".indexOf(letter) == -1) {
            return;
        }
        
        if (word.indexOf(letter) != -1) {
            correct(letter);
        } else {
            incorrect(letter);
        }
    }

    //Mouse
    else if (e.type == "mouseup") {
        let div = e.target;

        //Only allow left click
        if(dead || e.button != 0 || div.id == "guesses"){
            return;
        }

        if (div.id == "") {
            div = div.getElementsByClassName("p")[0];
        }

        //Detect letter
        if("abcdefghijklmnopqrstuvwxyz".indexOf(div.id != -1)){
            let letter = div.id;

            if (word.indexOf(letter) != -1) {
                correct(letter);
            } else {
                incorrect(letter);
            }
        }
    }
}

//When guess is right
function correct(letter) {
    //Changes letter colors
    document.getElementById(letter) ? document.getElementById(letter).parentElement.setAttribute("id", "right") : function(){return;};

    let instances = word.split(letter).length - 1;
    let lastInstance = 0;
    for(let i = 0; i < instances + 1; i++) {
        let index = word.indexOf(letter, lastInstance);
        document.getElementById("letters").getElementsByTagName("p")[index].innerText = letter.toUpperCase();
        document.getElementById("letters").getElementsByTagName("div")[index].setAttribute("id", "found");
        lastInstance = word.indexOf(letter, lastInstance + 1);
    }

    //Checks if word has been found
    let foundWord = "";
    for(let div of document.getElementById("letters").getElementsByTagName("p")){
        foundWord += div.innerText.toLowerCase();
    }

    word == foundWord && victory();
}

//When guess is wrong
function incorrect(letter) {
    //Changes letter colors
    if (!document.getElementById(letter).parentElement.id) {
        document.getElementById(letter).parentElement.setAttribute("id", "wrong");
    } else {
        return;
    }
    
    //Flashes hangman image with red border   
    document.getElementsByTagName("img")[0].classList.remove("wrongAnswer");
    setTimeout(function (){
        document.getElementsByTagName("img")[0].classList.add("wrongAnswer");
    }, 1);

    
    //Changes image
    let string = document.getElementsByTagName("img")[0].src.split("/");
    let state = string[string.indexOf("hangman") + 1].charAt(5);
    state == 5 ? failure() : document.getElementsByTagName("img")[0].src = `../../images/projects/hangman/state${state - -1}.png`;
}

function victory() {
    dead = true;
    //document.getElementsByTagName("img")[0].src = "../../images/projects/hangman/win.png";
    showPlayAgain();
    revealWord();
}

function failure() {
    dead = true;
    document.getElementsByTagName("img")[0].src = "../../images/projects/hangman/state6.png";
    showPlayAgain();
    revealWord();
}

//Reveals mystery word
function revealWord() {
    let i = 0;
    for(let div of document.getElementById("letters").getElementsByTagName("div")) {
        if (div.getElementsByTagName("p")[0].innerText != "") {
            div.setAttribute("id", "right");
        } else {
            div.getElementsByTagName("p")[0].innerText = word.charAt(i).toUpperCase();
            div.setAttribute("id", "wrong");
        }
        i++;
    }
    showMeaning();
}

//Links to word meaning
function showMeaning() {
    let link = document.createElement("a");
    link.setAttribute("id", "meaning");
    link.setAttribute("target", "_blank");
    link.setAttribute("href", `https://google.com/search?q=${word}+meaning`);
    link.setAttribute("title", "View meaning of the word");
    link.innerText = "View word meaning ➜";
    document.getElementsByClassName("links")[0].appendChild(link);
}

//Shows play again button
function showPlayAgain() {
    let link = document.createElement("a");
    link.setAttribute("id", "playAgain");
    link.setAttribute("href", "Play again!");
    link.setAttribute("title", "Play the game again!");
    link.innerText = "Play again";
    document.getElementsByClassName("links")[0].appendChild(link);
    document.getElementById("playAgain").onmouseup = start;
}