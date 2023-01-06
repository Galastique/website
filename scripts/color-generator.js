changeCSS();

//Changes background color and text fields
function changeCSS(){
    let colors = generate();
    let rgb = `RGB(${colors[0]}, ${colors[1]}, ${colors[2]})`;
    let hex = getHex(colors);
    let cmyk = getCmyk(colors);
    let hsv = getHsv(colors);
    let hsl = getHsl(colors);
    document.body.style.backgroundColor = rgb;
    document.getElementById("rgb").innerText = rgb;
    document.getElementById("hex").innerText = hex;
    document.getElementById("cmyk").innerText = cmyk;
    document.getElementById("hsv").innerText = hsv;
    document.getElementById("hsl").innerText = hsl;
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
    if(r.length == 1){
        r = `0${r}`;
    }
    if(g.length == 1){
        g = `0${g}`;
    }
    if(b.length == 1){
        b = `0${b}`;
    }
    let hex  = `HEX #${r}${g}${b}`;
    return hex.toUpperCase();
}

//Gets cmyk value
function getCmyk(colors){
    let r = colors[0] / 255;
    let g = colors[1] / 255;
    let b = colors[2] / 255;
    let k = 1 - Math.max(r, g, b);
    let c = Math.round(((1 - r - k) / (1 - k)) * 100);
    let m = Math.round(((1 - g - k) / (1 - k)) * 100);
    let y = Math.round(((1 - b - k) / (1 - k)) * 100);
    let cmyk = `CMYK(${c}%, ${m}%, ${y}%, ${Math.round(k * 100)}%)`;
    return cmyk;
}

//Gets hsv value
function getHsv(colors){
    let r = colors[0] / 255;
    let g = colors[1] / 255;
    let b = colors[2] / 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let delta = max - min;
    let h = 0;
    let s = 0;
    let v = Math.round((max) * 100);
    if(max == r){
        h = Math.round(60 * ((g - b) / delta));
    }else if(max == g){
        h = Math.round(60 * ((b - r) / delta + 2));
    }else if(max == b){
        h = Math.round(60 * ((r - g) / delta + 4));
    }
    if(h < 0){
        h += 360;
    }
    if(max != 0){
        s = Math.round((1 - (min / max)) * 100);
    }
    let hsv = `HSV(${h}°, ${s}%, ${v}%)`;
    return hsv;
}

//Gets hsl value
function getHsl(colors){
    let r = colors[0] / 255;
    let g = colors[1] / 255;
    let b = colors[2] / 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let delta = max - min;
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;
    if(max == r){
        h = Math.round(60 * ((g - b) / delta));
    }else if(max == g){
        h = Math.round(60 * ((b - r) / delta + 2));
    }else if(max == b){
        h = Math.round(60 * ((r - g) / delta + 4));
    }
    if(h < 0){
        h += 360;
    }
    if(delta != 0){
        s = Math.round((delta) / ((1 - Math.abs(2 * l - 1))) * 100);
    }
    l = Math.round(l * 100);
    let hsl = `HSL(${h}°, ${s}%, ${l}%)`;
    return hsl;
}

//Changes text color if background color is too dark
function checkTextColor(c){
    if(c[0] + c[1] + c[2] <= 100){
        document.body.style.color = "white";
        document.getElementsByTagName("a")[0].style.color = "white";
        document.getElementsByTagName("p")[5].style.color = "white";
    }else{
        document.body.style.color = "black";
        document.getElementsByTagName("a")[0].style.color = "black";
        document.getElementsByTagName("p")[5].style.color = "black";
    }
}