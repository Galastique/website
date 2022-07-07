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

    //Makes sure hex value has the extra 0 if the number is smaller than 10
    if(colors[0] < 16){
        hex = `${hex.substring(0, 1)}0${hex.substring(1)}`;
    }
    if(colors[1] < 16){
        hex = `${hex.substring(0, 3)}0${hex.substring(3)}`;
    }
    if(colors[2] < 16){
        hex = `${hex.substring(0, 5)}0${hex.substring(5)}`;
    }

    document.getElementById("rgb").innerHTML = rgb.toUpperCase();
    document.getElementById("hex").innerHTML = hex.toUpperCase();
    document.getElementById("noJS").innerHTML = "";
}