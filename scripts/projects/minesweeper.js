//Global variables
const boardSize = 16;
const nMines = 40;
const explosionSound = document.getElementsByTagName("audio")[0];
let title = document.getElementsByTagName("h1")[0];
let time = document.getElementById("elapsedTime");
let stats = document.getElementById("minesLeft");
let notice = document.getElementById("notice");
let timeBest = document.getElementById("bestTime");

//Game variables
let alive = true;
let generated = false;
let minesLeft = nMines;
let timerInterval;
let startTime;
let mines = generateEmptyGrid();

//Starts game
bestTime();
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
                div.style.backgroundColor = "RGB(220, 40, 40)";
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
            div.style.backgroundImage = "url(../images/projects/minesweeper/flag.png)";
            minesLeft--;
        }else if(div.id){
            div.removeAttribute("id");
            div.style.backgroundImage = "";
            minesLeft++;
        }
        stats.innerText = `Mines left: ${minesLeft}`;
        minesLeft <= 0 ? (notice.innerText = `  (some flags are incorrect)`) : (notice.innerText = "");
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
function resetBoard() {
    document.body.classList = "";
    let game = document.getElementById("game");
    let child = game.lastElementChild;
    while(child){
        game.removeChild(child);
        child = game.lastElementChild;
    }
    game.style.borderColor = "darkgoldenrod";
    notice.innerText = "";
    title.innerText = "Minesweeper";
    generated = false;
    minesLeft = nMines;
    alive = true;
    stats.innerText = `Mines left: ${nMines}`;
    time.innerText = "Elapsed time: 0:00";
    mines = generateEmptyGrid();
}

//Starts game
function start(){
    generateMines();
    startTime = Date.now();
    stats.innerText = `Mines left: ${nMines}`;
    timerInterval = setInterval(updateTimer, 1000);
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

//Generates empty grid
function generateEmptyGrid(){
    return Array(boardSize).fill("").map(() => Array(boardSize).fill(""));
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

//Checks tiles around first click to reveal area (like every other minesweeper game. it makes it more fun)
function removeStartClick(){
    for(let i = 0; i < mines.length; i++){
        while(mines[i].includes("startClick")){
            mines[i][mines[i].indexOf("startClick")] = "";
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
        if(item.id != "flag"){
            item.className = "mine";
            item.style.backgroundImage = "url(../images/projects/minesweeper/mine.png)";
        }
    }

    else if(type == "full"){
        if(item.id == "flag" && mines[x][y] != "m"){
            item.style.backgroundImage = "url(../images/projects/minesweeper/wrongFlag.png)";
        }
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
    clearInterval(timerInterval);
    updateTimer();
    bestTime(Math.round((Date.now() - startTime) / 1000));
    document.getElementById("game").style.borderColor = "darkgreen";
    notice.innerText = "";
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
                item.style.backgroundImage = "url(../images/projects/minesweeper/flag.png)";
            }
        }
    }
}

//Death
function death(sound = true){
    sound && playSound();
    flashScreen();
    clearInterval(timerInterval);
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
                return xOrY == "x" ? i : j;
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
    let numbers = ["", "one", "two", "three", "four", "five", "six", "seven", "height"]
    return numbers[n];
}

//Detects key presses
function detectAction(e){
    switch(e.keyCode){
        //r - restart
        case 82:
            death(false);
            resetBoard();
            drawBoard();
            break;
    }
}

//Audio
function playSound(volume = 0.25){
    explosionSound.pause();
    explosionSound.currentTime = 0;
    explosionSound.volume = volume;
    explosionSound.play();
}

//Flashes screen on death
function flashScreen(){
    document.body.classList = "flashScreen";
}

//Formates time into readable format
function formatTime(time){
    let seconds = time;
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    //Changes time into mm:ss format
    let displaySeconds = (seconds % 60).toString();
    let displayMinutes = (minutes % 60).toString();
    let displayHours = (hours % 60).toString();
    let displayTime;

    //Makes sure time doesn't look weird if one of the values has a leading 0
    if(hours == 0){
        displaySeconds.length == 1 && (displaySeconds = `0${displaySeconds}`);
        displayTime = `${displayMinutes}:${displaySeconds}`;
    }else{
        displaySeconds.length == 1 && (displaySeconds = `0${displaySeconds}`);
        displayMinutes.length == 1 && (displayMinutes = `0${displayMinutes}`);
        displayTime = `${displayHours}:${displayMinutes}:${displaySeconds}`;
    }

    return displayTime;
}

//Updates timer value
function updateTimer() {
    let displayTime = formatTime(Math.round((Date.now() - startTime) / 1000));
    time.innerText = `Elapsed time: ${displayTime}`;
}

//Manages best time stat
function bestTime(newTime = 0) {
    const minesweeperSaveDataTemplate = {"bestTime": newTime}
    let minesweeperSaveData;
    localStorage.getItem("minesweeper") && (minesweeperSaveData = JSON.parse(localStorage.getItem("minesweeper")).bestTime);

    //If time doesnt exist
    if (!minesweeperSaveData) {
        timeBest.innerText = "Best time: 0:00";
        localStorage.setItem("minesweeper", JSON.stringify(minesweeperSaveDataTemplate));
        return;
    }

    //Saves new time
    if (newTime != 0 && minesweeperSaveData != 0 && newTime < minesweeperSaveData){
        minesweeperSaveData = newTime;
        localStorage.setItem("minesweeper", JSON.stringify({"bestTime": minesweeperSaveData}));
    }

    //Displays best time
    let displayTime = formatTime(minesweeperSaveData);
    timeBest.innerText = `Best time: ${displayTime}`;
}