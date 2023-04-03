import {getJSON} from "./getJsonData.js"

const wordList = getJSON("hangman");
let word = wordList[Math.floor(Math.random() * wordList.length)];

console.log(`Wordlist contains ${wordList.length} words`);
checkDuplicates();

//Checks for duplicates and counts
function checkDuplicates(){
    for (let i = 0; i < wordList.length; i++) {
        for (let j = 0; j < wordList.length; j++) {
            if (wordList[i] == wordList[j] && i != j) {
                console.log(`"${wordList[i]}" is a duplicate at word ${i}`);
            }
        }
    }
}