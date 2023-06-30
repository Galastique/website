import {wordList} from "../../data/hangman.js"
let word = wordList[Math.floor(Math.random() * wordList.length)];

console.log(`Wordlist contains ${wordList.length} words`);