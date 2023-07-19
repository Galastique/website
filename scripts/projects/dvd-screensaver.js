let image = document.getElementById("logo");
let axisX = {motion: "right", position: 0, max: window.innerWidth - image.width};
let axisY = {motion: "down", position: 0, max: window.innerHeight - image.height};
let sideHits = 0;
let cornerHits = 0;
let timeSinceLastHit = 999;

document.onkeydown = toggleUI;

setInterval(move, 6);

//Hides UI
function toggleUI(e) {
    if (e.code != "KeyS") {
        return;
    }
    
    document.getElementById("stats").className == "invisible" ? (document.getElementById("stats").className = "visible") : (document.getElementById("stats").className = "invisible");
    document.getElementById("noUnderline").className == "invisible" ? (document.getElementById("noUnderline").className = "visible") : (document.getElementById("noUnderline").className = "invisible");
}

//Moves image
function move() {
    //Resets variables in case browser changes
    axisX.max = window.innerWidth - image.width;
    axisY.max = window.innerHeight - image.height;

    //Moves image
    if (axisX.motion == "right") {
        axisX.position++
    } else if (axisX.motion == "left") {
        axisX.position--;
    }

    if (axisY.motion == "down") {
        axisY.position++
    } else if (axisY.motion == "up") {
        axisY.position--;
    }
    image.style.left = `${axisX.position / window.innerWidth * 100}%`;
    image.style.top = `${axisY.position / window.innerHeight * 100}%`;

    //Checks if direction changes
    if (axisX.position >= axisX.max) {
        axisX.motion = "left";
        hitWall();
    } else if (axisX.position <= 0) {
        axisX.motion = "right";
        hitWall();
    }

    if (axisY.position >= axisY.max) {
        axisY.motion = "up";
        hitWall();
    } else if (axisY.position <= 0) {
        axisY.motion = "down";
        hitWall();
    }
    updateStats();
}

//Pretty self explanatory
function hitWall() {
    if (performance.now() - timeSinceLastHit <= 5) {
        cornerHits++;
    } else {
        sideHits++;
    }
    timeSinceLastHit = performance.now();
}

function updateStats() {
    document.getElementById("sideHits").innerText = `Side hits: ${sideHits}`;
    document.getElementById("cornerHits").innerText = `Corner hits: ${cornerHits}`;
}