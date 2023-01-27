//Global variables
const boardSize = 16;
const nMines = 40;
let title = document.getElementsByTagName("h1")[0];
let stats = document.getElementsByTagName("p")[0];

//Game variables
let alive = true;
let generated = false;
let minesLeft = nMines;
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

//Detects keypresses
document.onkeydown = detectAction;

//Click events
document.getElementById("game").onmouseup = function(event) {
    let div = event.target;
    
    if(div.id == "game" || div.id == "row" || !alive){
        return;
    }
    
    //Left click
    if(event.button == 0){
        if(!generated){
            div.id = "startClick";
            let x = getCoordsByDiv("startClick", "x");
            let y = getCoordsByDiv("startClick", "y");

            x > 0 && y > 0 && (mines[x - 1][y - 1] = "startClick"); //top left
            x > 0 && (mines[x - 1][y] = "startClick"); //top
            x > 0 && y < boardSize - 1 && (mines[x - 1][y + 1] = "startClick"); //top right
            y > 0 && (mines[x][y - 1] = "startClick"); //left
            mines[x][y] = "startClick"; //center
            y < boardSize - 1 && (mines[x][y + 1] = "startClick"); //right
            x < boardSize - 1 && y > 0 && (mines[x + 1][y - 1] = "startClick"); //bottom left
            x < boardSize - 1 && (mines[x + 1][y] = "startClick"); //bottom
            x < boardSize - 1 && y < boardSize - 1 && (mines[x + 1][y + 1] = "startClick"); //bottom right

            start();
        }

        //Only reveals tile if flag isnt there
        if(div.id != "flag"){
            div.id = "reveal";
            let x = getCoordsByDiv("reveal", "x");
            let y = getCoordsByDiv("reveal", "y");
            div.removeAttribute("id");
            let object = mines[x][y];

            if(object == "m"){
                death();
            }else{
                showTile(x, y);
            }
        }


    }

    //Right click
    else if(event.button == 2 && generated){
        //Places/removes flag
        if(!div.id && div.style.backgroundColor != "rgb(180, 180, 180)"){
            div.id = "flag";
            div.style.backgroundImage = "url(../images/minesweeper_flag.png)";
            minesLeft--;
        }else if(div.id){
            div.removeAttribute("id");
            div.style.backgroundImage = "";
            minesLeft++;
        }
        minesLeft < 0 ? (stats.innerText = `Mines left: ${minesLeft} (one or more of your flags are incorrect)`) : stats.innerText = `Mines left: ${minesLeft}`;
    }
    window.addEventListener("contextmenu", e => e.preventDefault());
}

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
function resetBoard(){
    let game = document.getElementById("game");
    let child = game.lastElementChild;
    while(child){
        game.removeChild(child);
        child = game.lastElementChild;
    }
    game.style.borderColor = "darkgoldenrod";
    title.innerText = "Minesweeper";
    generated = false;
    minesLeft = nMines;
    alive = true;
    stats.innerText = `Mines left: ${nMines}`;
    mines = [["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""]];
}

//Starts game
function start(){
    generateMines();
    stats.innerText = `Mines left: ${nMines}`;
}

//Generates mines
function generateMines(){
    let mine;
    let x;
    let y;
    
    for(let i = 0; i < nMines; i++){
        //Checks if random tile is clear
        do{
            x = randomNumber();
            y = randomNumber();
            mine = getDivByCoords(x, y);
        }while(mines[x - 1][y - 1] != "" || mine.id != "");
        
        mines[x - 1][y - 1] = "m";
    }
    generated = true;
    removeStartClick();
    generateNumbers();
}

//Checks tiles around first click to reveal area (like every other minesweeper game. it makes it more fun)
function removeStartClick(){
    for(let i = 0; i < mines.length; i++){
        while(mines[i].includes("startClick")){
            mines[i][mines[i].indexOf("startClick")] = "";
        }
    }
}

//Generates numbers
function generateNumbers(){
    for(let i = 0; i < mines.length; i++){
        for(let j = 0; j < mines[i].length; j++){
            //I know this section is essential impossible to read, but the only other way to do it was to have 50 lines of nested if statements
            //It's efficient, trust me
            if(mines[i][j] != "m"){
                let surroundingMines = 0;
                
                //Counts surrounding mines
                i > 0 && j > 0 && mines[i - 1][j - 1] == "m" && surroundingMines++; //top left
                i > 0 && mines[i - 1][j] == "m" && surroundingMines++; //top
                i > 0 && j < boardSize - 1 &&  mines[i - 1][j + 1] == "m" && surroundingMines++; //top right
                j > 0 && mines[i][j - 1] == "m" && surroundingMines++; //left
                j < boardSize - 1 && mines[i][j + 1] == "m" && surroundingMines++; //right
                i < boardSize - 1 && j > 0 && mines[i + 1][j - 1] == "m" && surroundingMines++; //bottom left
                i < boardSize - 1 && mines[i + 1][j] == "m" && surroundingMines++; //bottom
                i < boardSize - 1 && j < boardSize - 1 && mines[i + 1][j + 1] == "m" && surroundingMines++; //bottom right

                //Adds numbers to array
                surroundingMines != 0 && (mines[i][j] = surroundingMines);
            }
        }
    }
}

//Reveals full board
function revealBoard(){
    for(let i = 0; i < boardSize; i++){
        for(let j = 0; j < boardSize; j++){
            showTile(i, j, "full");
        }
    }
}

//Reveals individual tiles
let checkedTiles = [];
function showTile(x, y, type){
    type != "surround" && (checkedTiles = []);
    let row = document.getElementsByClassName("row")[x];
    let item = row.getElementsByTagName("div")[y];
    //Mines
    if(type != "surround" && mines[x][y] == "m"){
        item.className = "mine";
        item.style.backgroundImage = "url(../images/minesweeper_mine.png)";
        item.style.backgroundColor = "RGB(180, 180, 180)";
    }

    //Numbers & empty spots
    else if(generated){
        let div = getDivByCoords(x + 1, y + 1);
        //Reveals current spot
        div.className = number(mines[x][y]);
        div.innerText = mines[x][y];
        item.style.backgroundColor = "RGB(180, 180, 180)";

        //Automatically removes flag if it was on top of blank space (only runs during with recursive calls)
        if(div.id){
            div.removeAttribute("id");
            div.style.backgroundImage = "";
            minesLeft++;
            minesLeft < 0 ? (stats.innerText = `Mines left: ${minesLeft} (one or more of your flags are incorrect)`) : stats.innerText = `Mines left: ${minesLeft}`;
        }
        
        //Check for other empty spots
        if(type != "full" && !checkedTiles.includes(`${x},${y}`) && mines[x][y] == ""){
            checkedTiles.push(`${x},${y}`);
            x > 0 && y > 0 && showTile(x - 1, y - 1, "surround"); //top left
            x > 0 && showTile(x - 1, y, "surround"); //top
            x > 0 && y < boardSize - 1 && showTile(x - 1, y + 1, "surround"); //top right
            y > 0 && showTile(x, y - 1, "surround"); //left
            y < boardSize - 1 && showTile(x, y + 1, "surround"); //right
            x < boardSize - 1 && y > 0 && showTile(x + 1, y - 1, "surround"); //bottom left
            x < boardSize - 1 && showTile(x + 1, y, "surround"); //bottom
            x < boardSize - 1 && y < boardSize - 1 && showTile(x + 1, y + 1, "surround"); //bottom right
        }
        type != "full" && checkIfWon();
    }
}

//Checks if user has won
function checkIfWon(){
    let count = 0;
    for(let i = 0; i < boardSize; i++){
        let row = document.getElementsByClassName("row")[i];
        for(let j = 0; j < boardSize; j++){
            let item = row.getElementsByTagName("div")[j];
            if(item.style.backgroundColor == "rgb(180, 180, 180)"){
                count++;
            }
            if(count == (boardSize * boardSize) - nMines){
                victory();
            }
        }
    }
}

//Victory
function victory(){
    document.getElementById("game").style.borderColor = "darkgreen";
    title.innerText = "You won!!!";
    stats.innerText = "Mines left: 0";
    generated = false;
    alive = false;

    for (let i = 0; i < boardSize; i++) {
        let row = document.getElementsByClassName("row")[i];
        for (let j = 0; j < boardSize; j++) {
            let item = row.getElementsByTagName("div")[j];
            if (item.style.backgroundColor != "rgb(180, 180, 180)") {
                item.id = "flag";
                item.style.backgroundImage = "url(../images/minesweeper_flag.png)";
            }
        }
    }
}

//Death
function death(){
    document.getElementById("game").style.borderColor = "darkred";
    title.innerText = "You lost! (Press R to start a new game)";
    generated = false;
    alive = false;
    revealBoard();
}

//Returns div object from (x, y) coords (top left origin = 1, 1)
function getDivByCoords(x, y){
    return document.getElementsByClassName("row")[x - 1].getElementsByTagName("div")[y - 1];
}

//Returns coords from div object
function getCoordsByDiv(id, xOrY){
    for(let i = 0; i < boardSize; i++){
        let row = document.getElementsByClassName("row")[i];
        for(let j = 0; j < boardSize; j++){
            let item = row.getElementsByTagName("div")[j];
            if(item.id == id){
                if(xOrY == "x"){
                    return i;
                }else if(xOrY == "y"){
                    return j;
                }
            }
        }
    }
}

//Generates number between [1, 16]
function randomNumber(){
    return(Math.floor(Math.random() * boardSize) + 1);
}

//Transforms number in letters for class name
function number(n){
    let number = "";
    switch(n){
        case 1:
            number = "one";
            break;
        case 2:
            number = "two";
            break;
        case 3:
            number = "three";
            break;
        case 4:
            number = "four";
            break;
        case 5:
            number = "five";
            break;
        case 6:
            number = "six";
            break;
        case 7:
            number = "seven";
            break;
        case 8:
            number = "height";
            break;
    }
    return number;
}

//Detects key presses
function detectAction(e){
    switch(e.keyCode){
        //r - restart
        case 82:
            death();
            resetBoard();
            drawBoard();
            break;
    }
}