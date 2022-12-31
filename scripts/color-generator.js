//Changes background color and text fields
function changeCSS(){
    let colors = generate();
    let rgb = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
    let hex = getHex(colors);
    document.body.style.backgroundColor = rgb;
    document.getElementById("rgb").innerHTML = rgb.toUpperCase();
    document.getElementById("hex").innerHTML = hex.toUpperCase();
    checkTextColor(colors);
}

//Generates random color
function generate(){
    let c = [];
    for(let i = 0; i < 3; i++){
        c.push(Math.floor(Math.random() * 256));
    }
    return c;
}

//Gets hex value
function getHex(colors){
    let r = colors[0].toString(16);
    let g = colors[1].toString(16);
    let b = colors[2].toString(16);
    let h = "#";
    if(r.length == 1){
        r = `0${r}`;
    }
    if(g.length == 1){
        g = `0${g}`;
    }
    if(b.length == 1){
        b = `0${b}`;
    }
    h += r + g + b;
    return h;
}

//Changes text color if background color is too dark
function checkTextColor(c){
    if(c[0] + c[1] + c[2] <= 100){
        document.body.style.color = "white";
        document.getElementsByTagName("a")[0].style.color = "white";
        document.getElementsByTagName("p")[2].style.color = "white";
    }else{
        document.body.style.color = "black";
        document.getElementsByTagName("a")[0].style.color = "black";
        document.getElementsByTagName("p")[2].style.color = "black";
    }
}