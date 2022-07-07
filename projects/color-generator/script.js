//Changes background color and text fields
function changeCSS(){
    document.getElementById("noJS").innerHTML = "";
    let colors = generate();
    let rgb = getRGB(colors);
    let hex = getHex(colors);

    document.body.style.backgroundColor = rgb;

    document.getElementById("rgb").innerHTML = rgb.toUpperCase();
    document.getElementById("hex").innerHTML = hex.toUpperCase();
}

//Generates random color
function generate(){
    let colors = [];

    for(let i = 0; i < 3; i++){
        colors.push(Math.floor(Math.random() * 256));
    }

    return colors;
}

//Gets RGB value
function getRGB(colors){
    return `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
}

//Gets hex value
function getHex(colors){
    let red = colors[0].toString(16);
    let green = colors[1].toString(16);
    let blue = colors[2].toString(16);
    let hex = "#";

    if(red.length == 1){
        red = `0${red}`;
    }
    if(green.length == 1){
        green = `0${green}`;
    }
    if(blue.length == 1){
        blue = `0${blue}`;
    }

    hex += red + green + blue;

    return hex;
}