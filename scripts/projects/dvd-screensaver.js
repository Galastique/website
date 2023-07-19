//Properties
let image = document.getElementById("logo");
let axisX = {motion: "right", position: 0};
let axisY = {motion: "down", position: 0};
let hits = {side: 0, corner: 0, timeSinceLast: 999};

document.onkeydown = toggleUI;
setInterval(move, 10);

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
    let imageHeight = image.height / window.innerHeight;
    let imageWidth = image.width / window.innerWidth;

    //Moves image
    if (axisX.motion == "right") {
        axisX.position += imageWidth;
    } else if (axisX.motion == "left") {
        axisX.position -= imageWidth;
    }

    if (axisY.motion == "down") {
        axisY.position += imageHeight;
    } else if (axisY.motion == "up") {
        axisY.position -= imageHeight;
    }
    image.style.left = `${axisX.position}%`;
    image.style.top = `${axisY.position}%`;

    //Checks if direction changes
    if (axisX.position >= 100 - imageWidth * 100) {
        axisX.motion = "left";
        hitWall();
    } else if (axisX.position <= 0) {
        axisX.motion = "right";
        hitWall();
    }

    if (axisY.position >= 100 - imageHeight * 100) {
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
    if (performance.now() - hits.timeSinceLast <= 5) {
        hits.corner++;
        hits.side--;
    } else {
        hits.side++;
    }
    hits.timeSinceLast = performance.now();
}

function updateStats() {
    document.getElementById("sideHits").innerText = `Side hits: ${hits.side}`;
    document.getElementById("cornerHits").innerText = `Corner hits: ${hits.corner}`;
}