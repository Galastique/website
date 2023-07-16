//Global variables
let title = document.getElementsByTagName("h1")[0];
let currentScore = document.getElementById("currentScore");
let bestScore = document.getElementById("bestScore");
const eatingSound = document.getElementsByTagName("audio")[0];
const boardSize = 16;
const initialSize = 4;
const delays = [250, 150, 100, 75];
let delay = delays[1];

//Initial snake variables
let snakeLength;
let overflow;
let headLocation;
let bodyParts;
let currentDirection;
let lastDirection;

//Starts game
drawBoard();
start();

//Detects keypresses and stops scrolling with arrows
document.onkeydown = detectDirection;
window.addEventListener("keydown", function(e) {
    if(["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

//Draws board
function drawBoard(){
    const game = document.getElementById("game");
    for(let i = 0; i < boardSize; i++) {
        let row = document.createElement("div");
        row.className = "row";

        for(let j = 0; j < boardSize; j++){
            let cell = document.createElement("div");
            row.appendChild(cell);
        }

        game.appendChild(row);
    }
    checkerBoard();
}

//Turn board into checker board pattern
function checkerBoard(){
    for(let i = 0; i < boardSize; i++) {
        let row = document.getElementsByClassName("row")[i];

        for(let j = 0; j < boardSize; j++){
            let cell = row.getElementsByTagName("div")[j];

            if((i + j) % 2 == 0){
                cell.className = "darker";
            }
        }
    }
}

//Clears board
function clearBoard(){
    for(let row of document.getElementsByClassName("row")){
        for(let item of row.getElementsByTagName("div")){
            item.className = "";
        }
    }
    checkerBoard();
}

//Starts game
function start(){
    //Resets settings to default values
    document.getElementById("game").style.borderColor = "darkgoldenrod";
    title.innerText = "Snake";
    snakeLength = initialSize;
    overflow = initialSize - 1;
    headLocation = [boardSize / 2, boardSize / 2];
    bodyParts = [[boardSize / 2, boardSize / 2]];
    lastDirection = null;
    clearBoard();
    updateScore();

    //Sets snake and movement
    getXY(headLocation[0], headLocation[1]).classList.add("head");
    slither = setInterval(move, delay);
    spawnFruit();
}

//Moves snake
function move(){
    currentDirection && headToBody();
    switch(currentDirection){
        case "up":
            headLocation[0] != 1 ? (headLocation[0]--, changeSnake()) : death();
            break;

        case "left":
            headLocation[1] != 1 ? (headLocation[1]--, changeSnake()) : death();
            break;

        case "down":
            headLocation[0] != boardSize ? (headLocation[0]++, changeSnake()) : death();
            break;

        case "right":
            headLocation[1] != boardSize ? (headLocation[1]++, changeSnake()) : death();
            break;
    }

    //Creates new head
    function changeSnake(){
        let snakeHead = getXY(headLocation[0], headLocation[1]);
        let tail = getXY(bodyParts[0][0], bodyParts[0][1]);

        //Removes last bit of tail
        if(overflow == 0){
            tail.classList.remove("body");
            bodyParts.shift();
        }else{
            overflow--;
        }

        //Adds head
        bodyParts.push([headLocation[0], headLocation[1]]);
        
        //Checks if object is on head
        snakeHead.classList.add("head");
        snakeHead.style.backgroundImage = "url(../images/projects/snake/smile.png)";
        snakeHead.style.transform = `rotate(${["down", "left", "up", "right"].indexOf(currentDirection) * 90}deg)`;

        if(snakeHead.classList.contains("fruit")){
            snakeHead.classList.remove("fruit");
            eat();
        }else if(snakeHead.classList.contains("body")){
            death();
        }
        
        lastDirection = currentDirection;
    }

    //Transforms head piece into body
    function headToBody(){
        let head = getXY(headLocation[0], headLocation[1]);
        head.classList.replace("head", "body");
        head.style.backgroundImage = "";
    }
}

//Generates fruit
function spawnFruit(){
    let fruit;
    
    //Makes sure fruit isnt on top of snake
    do{
        fruit = getXY(randomNumber(), randomNumber());
    }while((fruit.classList.contains("head") || fruit.classList.contains("body")) && fruit.id != null);
    
    fruit.classList.add("fruit");
}

//Eats fruit and grows
function eat(){
    playSound();
    snakeLength++;
    overflow++;
    updateScore();

    let snakeHead = getXY(headLocation[0], headLocation[1]);
    snakeHead.style.backgroundImage = "url(../images/projects/snake/eat.png)";
    snakeHead.style.transform = `rotate(${["down", "left", "up", "right"].indexOf(currentDirection) * 90}deg)`;

    if(checkLength() == "stop"){
        return;
    }

    spawnFruit();
}

//Checks if player has won
function checkLength() {
    if(snakeLength == boardSize ** 2) {
        victory();
        return "stop";
    }
}

//Changes score
function updateScore(){
    let difficulty = ["easy", "medium", "hard", "insane"][delays.indexOf(delay)];
    let score = snakeLength - initialSize;
    let highScore = 0;

    try {
        let highScores = JSON.parse(localStorage.getItem("snake")).highScore;
        highScore =  Object.values(highScores)[Object.keys(highScores).indexOf(difficulty)];
    }catch(err){
        localStorage.setItem("snake", JSON.stringify({"highScore": {"easy": 0, "medium": 0, "hard": 0, "insane": 0}}));
    }

    if(score > highScore){
        highScore = score;
        let highScores = JSON.parse(localStorage.getItem("snake")).highScore;
        highScores = {
            highScore: {
                "easy": difficulty == "easy" ? highScore : highScores.easy,
                "medium": difficulty == "medium" ? highScore : highScores.medium,
                "hard": difficulty == "hard" ? highScore : highScores.hard,
                "insane": difficulty == "insane" ? highScore : highScores.insane
            }
        };
        localStorage.setItem("snake", JSON.stringify(highScores));
    }

    currentScore.innerText = `Current score: ${score}`;
    bestScore.innerText = `High score (${ difficulty}): ${ highScore }`;
}
    
//When player dies
function death(){
    clearInterval(slither);

    if(currentDirection){
        let snakeHead = getXY(headLocation[0], headLocation[1]);
        snakeHead.style.backgroundImage = "url(../images/projects/snake/frown.png)";
        snakeHead.style.transform = `rotate(${["down", "left", "up", "right"].indexOf(currentDirection) * 90}deg)`;
        currentDirection = null;
    }

    document.getElementById("game").style.borderColor = "darkred";
    title.innerText = "You died! (Press R to restart)";
}

//When player wins
function victory(){
    clearInterval(slither);
    document.getElementById("game").style.borderColor = "darkgreen";
    title.innerText = "You won!!!";
}

//Returns div object from (x, y) coords (top left origin = 1, 1)
function getXY(x, y){
    return document.getElementsByClassName("row")[x - 1].getElementsByTagName("div")[y - 1];
}

//Generates number between [1, 16]
function randomNumber(){
    return(Math.floor(Math.random() * boardSize) + 1);
}

//Detects which direction user is trying to move
function detectDirection(e) {
    if(!currentDirection && !lastDirection && overflow > 1){
        delay = changeDifficulty();
        clearInterval(slither);
        slither = setInterval(move, delay);
        updateScore();
    }

    switch(e.keyCode){
        //w / up
        case 87:
        case 38:
            if(lastDirection != "down"){
                currentDirection = "up";
            }
            break;
        
        //a / left
        case 65:
        case 37:
            if(lastDirection != "right"){
                currentDirection = "left";
            }
            break;
            
        //s / down
        case 83:
        case 40:
            if(lastDirection != "up"){
                currentDirection = "down";
            }
            break;
            
        //d / right
        case 68:
        case 39:
            if(lastDirection != "left"){
                currentDirection = "right";
            }
            break;

        //r - restart
        case 82:
            delay = changeDifficulty();
            death();
            start();
            updateScore();
            break;
    }
}

//Audio
function playSound() {
    eatingSound.pause();
    eatingSound.currentTime = 0;
    eatingSound.volume = 0.1;
    eatingSound.play();
}

//Change difficulty
function changeDifficulty() {
    let radioButtons = document.getElementsByTagName("input");
    for(let i = 0; i < radioButtons.length; i++){
        if(radioButtons[i].checked){
            return delays[i];
        }
    }
}