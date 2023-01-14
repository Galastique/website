//Global variables
let title = document.getElementsByTagName("h1")[0];
let stats = document.getElementsByTagName("p")[0];
const boardSize = 16;

//Game variables
let mines = [
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""]
];

//Starts game
drawBoard();
start(); //ONLY CALL THIS GUY ON CLICK (BE SURE TO SAVE THE CLICK LOCATION TO MAKE SURE NO BOMBS SPAWN THERE)

//Detects keypresses
document.onkeydown = detectAction;

//Prevents right-clicking from opening context menu instead of placing flag
document.getElementById("game").onmousedown = function(event) {
    window.addEventListener("contextmenu", e => e.preventDefault());
}

//Draws board
function drawBoard(){
    document.getElementById("game").style.borderColor = "darkgoldenrod";
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
    let game = document.getElementById("game");
    let child = game.lastElementChild;
    while(child){
        game.removeChild(child);
        child = game.lastElementChild;
    }
    mines = [["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""]];
}

//Reveals board
function revealBoard(){
    //MAKE EVERYTHING HAVE AN OPACITY OF 0 BY DEFAULT, AND CHANGE TO 1 ON CLICK
}

//Starts game
function start(){
    generateMines();
    stats.innerText = "Mines left: 40";
}

//Generates mines
function generateMines(){
    let fruit;
    let x;
    let y;
    
    for(let i = 0; i < 40; i++){
        //Makes sure fruit isnt on top of snake
        do{
            x = randomNumber();
            y = randomNumber();
            fruit = getXY(x, y);
        }while(fruit.className != "" && fruit.id != null);
        
        fruit.className = "mine";
        mines[x - 1][y - 1] = "m";
    }
    generateNumbers();
}

//Generates numbers
function generateNumbers(){
    for(let i = 0; i < mines.length; i++){
        for(let j = 0; j < mines[i].length; j++){
            //Listen, I know this section is scuffed as fuck, but I honestly wasnt sure how to tackle it
            //hmu if you know a better way
            if(mines[i][j] != "m"){
                let nMines = 0;
                if(i > 0){
                    if(j > 0){
                        mines[i - 1][j - 1] == "m" && nMines++;
                    }
                    
                    if(j < mines[i].length - 1){
                        mines[i - 1][j + 1] == "m" && nMines++;
                    }
                    
                    mines[i - 1][j] == "m" && nMines++;
                }
                
                if(i < mines.length - 1){
                    if(j > 0){
                        mines[i + 1][j - 1] == "m" && nMines++;
                    }
                    
                    if(j < mines[i].length - 1){
                        mines[i + 1][j + 1] == "m" && nMines++;
                    }
                    
                    mines[i + 1][j] == "m" && nMines++;
                }
                
                if(j > 0){
                    mines[i][j - 1] == "m" && nMines++;
                }
                
                if(j < mines[i].length - 1){
                    mines[i][j + 1] == "m" && nMines++;
                }

                mines[i][j] = nMines;
                getXY(i + 1, j + 1).className = number(nMines);
                if(nMines != 0){
                    getXY(i + 1, j + 1).innerText = nMines;
                }
            }
        }
    }
}

//Death
function death(){
    document.getElementById("game").style.borderColor = "darkred";

}

function victory(){
    document.getElementById("game").style.borderColor = "darkgreen";

}

//Returns div object from (x, y) coords (top left origin = 1, 1)
function getXY(x, y){
    return document.getElementsByClassName("row")[x - 1].getElementsByTagName("div")[y - 1];
}

//Generates number between [1, 16]
function randomNumber(){
    return(Math.floor(Math.random() * boardSize) + 1);
}

//Transforms number in letters
function number(n){
    let number;
    if(n == 1){
        number = "one";
    }else if(n == 2){
        number = "two";
    }else if(n == 3){
        number = "three";
    }else if(n == 4){
        number = "four";
    }else if(n == 5){
        number = "five";
    }else if(n == 6){
        number = "six";
    }else if(n == 7){
        number = "seven";
    }else if(n == 8){
        number = "height";
    }
    return number;
}

//Detects key presses
function detectAction(e){
    switch(e.keyCode){
        //r - restart
        case 82:
        case 32:
        case 13:
            death();
            clearBoard();
            drawBoard();
            generateMines();
            break;
    }
}