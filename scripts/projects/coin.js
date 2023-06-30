const flipSound = document.getElementsByTagName("audio")[0];
let tally = [0, 0];

function flip() {
    let flip = ["heads", "tails"][Math.floor(Math.random() * 2)];
    tally[["heads", "tails"].indexOf(flip)]++;

    //Changes image and it's properties
    document.getElementsByTagName("img")[0].setAttribute("src", `../images/projects/coin/${flip}.png`);
    document.getElementsByTagName("img")[0].setAttribute("alt", `${flip}`);
    document.getElementsByTagName("img")[0].setAttribute("title", `${flip}`);

    //Changes result text
    document.getElementById("result").innerText = `You flipped ${flip}! Click the coin to flip it again.`;
    document.getElementById("heads").innerText = `Heads - ${tally[0]}`;
    document.getElementById("tails").innerText = `Tails - ${tally[1]}`;

    //Plays sound
    flipSound.pause();
    flipSound.currentTime = 0;
    flipSound.volume = 0.8;
    flipSound.play();
}