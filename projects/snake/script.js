//Draws board
function init(){
    const container = document.getElementById("game");
    container.style.setProperty('--grid-rows', 4);
    container.style.setProperty('--grid-cols', 4);

    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        cell.innerText = (c + 1);
        container.appendChild(cell).className = "grid-item";
    }
}

//Starts game
function start(){
    let snake = [[13],[13]]; 
    let slither = setInterval(move, 250);
}

//Moves snake
function move(){
    //have array with movement coords, and only move last piece to front

    //if piece in front wall or snake (coords in array) death()
    //if piece in front food eat()
}

//Eats fruit and grows
function eat(){
    
}

//When player dies
function death(){
    clearInterval(slither);
}