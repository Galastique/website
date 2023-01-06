//Global variables
let title = document.getElementsByTagName("h1")[0];
const delay = 180;
const boardSize = 16;
const initialSize = 4;
let snakeLength = initialSize;
let overflow = initialSize - 1;
let headLocation = [boardSize / 2, boardSize / 2];
let bodyParts = [[boardSize / 2, boardSize / 2]];
let lastDirection;

//Starts game
draw();
start();

//Detects keypresses
document.onkeydown = detectDirection;

//Draws board
function draw(){
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

//Starts game
function start(){
    title.innerText = "Simple snake game";
    let snakeHead = getXY(headLocation[0], headLocation[1]);
    snakeHead.className = "head";
    slither = setInterval(move, delay);
    addFruit();
}

//Moves snake
function move(){
    switch(lastDirection){
        case "up":
            if(headLocation[0] != 1){
                headToBody();
                headLocation[0]--;
                newHead();
            }else{
                checkLength();
                death();
            }
            break;

        case "left":
            if(headLocation[1] != 1){
                headToBody();
                headLocation[1]--;
                newHead();
            }else{
                checkLength();
                death();
            }
            break;

        case "down":
            if(headLocation[0] != boardSize){
                headToBody();
                headLocation[0]++;
                newHead();
            }else{
                checkLength();
                death();
            }
            break;

        case "right":
            if(headLocation[1] != boardSize){
                headToBody();
                headLocation[1]++;
                newHead();
            }else{
                checkLength();
                death();
            }
            break;
    }

    function checkLength(){
        if(snakeLength == boardSize ** 2){
            victory();
        }
    }

    function headToBody(){
        snakeHead = getXY(headLocation[0], headLocation[1]);
        snakeHead.className = "body";
    }

    function newHead(){
        //Checks if object is on head
        snakeHead = getXY(headLocation[0], headLocation[1]);

        //Moves body
        moveTail();
        bodyParts.push([headLocation[0], headLocation[1]]);
        
        if(snakeHead.className == "fruit"){
            eat();
        }else if(snakeHead.className == "body"){
            death();
        }
        
        snakeHead.className = "head";
    }
}

function moveTail(){
    let tail = getXY(bodyParts[0][0], bodyParts[0][1]);
    if(overflow == 0){
        tail.className = "";
        bodyParts.shift();
    }else{
        overflow--;
    }
}

//Eats fruit and grows
function eat(){
    addFruit();
    snakeLength++;
    overflow++;
}

//Generates fruit
function addFruit(){
    let fruit = getXY(randomNumber(), randomNumber());
    
    //Makes sure fruit isnt on top of snake
    while(fruit.className != "" && fruit.id != null){
        fruit = getXY(randomNumber(), randomNumber());
    }
    
    fruit.className = "fruit";
}
    
//When player dies
function death(){
    clearInterval(slither);
    title.innerText = "You died! (press R to restart)";
}

//When player wins
function victory(){
    clearInterval(slither);
    title.innerText = "You win!!";
}

//Returns div object from (x, y) coords
function getXY(x, y){
    return document.getElementsByClassName("row")[x - 1].getElementsByTagName("div")[y - 1];
}

//Generates number between [1, 16]
function randomNumber(){
    return(Math.floor(Math.random() * boardSize) + 1);
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

//Detects which direction user is trying to move
function detectDirection(e){
    //w / up
    if (e.keyCode == "87" || e.keyCode == "38") {
        lastDirection = "up";
    }
    //a / left
    else if (e.keyCode == "65" || e.keyCode == "37") {
        lastDirection = "left";
    }
    //s / down
    else if (e.keyCode == "83" || e.keyCode == "40") {
       lastDirection = "down";
    }
    //d / right
    else if (e.keyCode == "68" || e.keyCode == "39") {
       lastDirection = "right";
    }
    //r / restart
    else if(e.keyCode == "82"){
        death();
        clearBoard();
        snakeLength = initialSize;
        overflow = initialSize - 1;
        headLocation = [boardSize / 2, boardSize / 2];
        bodyParts = [[boardSize / 2, boardSize / 2]];
        lastDirection = null;
        start();
    }
}