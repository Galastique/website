//Generates random color
function generate(){
    let colors = [];

    for(let i = 0; i < 3; i++){
        colors.push(Math.floor(Math.random() * 256));
    }

    changeCSS(colors);
}

//Changes background color and text fields
function changeCSS(colors){
    let rgb = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
    let hex = `#${colors[0].toString(16) + colors[1].toString(16) + colors[2].toString(16)}`;

    document.body.style.backgroundColor = rgb;

    document.getElementById("rgb").innerHTML = rgb.toUpperCase();
    document.getElementById("hex").innerHTML = hex.toUpperCase();
    document.getElementById("noJS").innerHTML = "";
}