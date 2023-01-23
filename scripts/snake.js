//Global variables
let title = document.getElementsByTagName("h1")[0];
let stats = document.getElementsByTagName("p")[0];
const delay = 150;
const boardSize = 16;
const initialSize = 4;

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
}

//Clears board
function clearBoard(){
    for(let row = 0; row < boardSize; row++){
        for(let i = 0; i < boardSize; i++){
            let item = getXY(row + 1, i + 1);
            item.className = "";
        }
    }
}

//Starts game
function start(){
    //Resets settings to default values
    document.getElementById("game").style.borderColor = "darkgoldenrod";
    title.innerText = "Slithering snake";
    snakeLength = initialSize;
    overflow = initialSize - 1;
    headLocation = [boardSize / 2, boardSize / 2];
    bodyParts = [[boardSize / 2, boardSize / 2]];
    currentDirection = null;
    lastDirection = null;
    clearBoard();
    updateScore();

    //Sets snake and movement
    getXY(headLocation[0], headLocation[1]).className = "head";
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
            tail.className = "";
            bodyParts.shift();
        }else{
            overflow--;
        }

        //Adds head
        bodyParts.push([headLocation[0], headLocation[1]]);
        
        //Checks if object is on head
        if(snakeHead.className == "fruit"){
            eat();
        }else if(snakeHead.className == "body"){
            death();
        }
        
        snakeHead.className = "head";
        lastDirection = currentDirection;
        checkLength();
    }

    //Transforms head piece into body
    function headToBody(){
        getXY(headLocation[0], headLocation[1]).className = "body";
    }

    //Checks if player has won
    function checkLength(){
        if(snakeLength == boardSize ** 2){
            victory();
        }
    }
}

//Generates fruit
function spawnFruit(){
    let fruit;
    
    //Makes sure fruit isnt on top of snake
    do{
        fruit = getXY(randomNumber(), randomNumber());
    }while(fruit.className != "" && fruit.id != null);
    
    fruit.className = "fruit";
}

//Eats fruit and grows
function eat(){
    spawnFruit();
    snakeLength++;
    overflow++;
    updateScore();
}

//Changes score
function updateScore(){
    let highScore = localStorage.getItem("highscore");
    let score = snakeLength - initialSize;
    if(!highScore){
        highScore = 0;
    }else if(score > highScore){
        highScore = score;
    }
    localStorage.setItem("highscore", highScore);
    stats.innerText = `Current score: ${score}    -    High score: ${highScore}`;
}
    
//When player dies
function death(){
    clearInterval(slither);
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
function detectDirection(e){
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

        //r / space / enter - restart
        case 82:
        case 32:
        case 13:
            death();
            start();
            updateScore();
            break;
    }
}