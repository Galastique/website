changeCSS();

//Changes background color and text fields
function changeCSS(){
    let colors = Array.from({length: 3}, () => Math.floor(Math.random() * 256));
    document.body.style.backgroundColor = getRGB(colors);
    document.getElementById("rgb").innerText = getRGB(colors);
    document.getElementById("hex").innerText = getHex(colors);
    document.getElementById("cmyk").innerText = getCmyk(colors);
    document.getElementById("hsv").innerText = getHsv(colors);
    document.getElementById("hsl").innerText = getHsl(colors);
    checkTextColor(colors);
    changeSelectTextColor();
}

//Gets rgb value
function getRGB(colors){
    return `RGB(${colors[0]}, ${colors[1]}, ${colors[2]})`;
}

//Gets hex value
function getHex(colors){
    let r = colors[0].toString(16);
    let g = colors[1].toString(16);
    let b = colors[2].toString(16);
    r.length == 1 && (r = `0${r}`);
    g.length == 1 && (g = `0${g}`);
    b.length == 1 && (b = `0${b}`);
    return `HEX #${r}${g}${b}`.toUpperCase();
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
    h < 0 && (h += 360);
    max != 0 && (s = Math.round((1 - (min / max)) * 100));
    return `HSV(${h}°, ${s}%, ${v}%)`;
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
    h < 0 && (h += 360);
    delta != 0 && (s = Math.round((delta) / ((1 - Math.abs(2 * l - 1))) * 100));
    l = Math.round(l * 100);
    return `HSL(${h}°, ${s}%, ${l}%)`;
}

//Changes text color if background color is too dark
function checkTextColor(c){
    if(c[0] + c[1] + c[2] <= 100){
        document.body.style.color = "white";
        document.getElementsByTagName("a")[0].style.color = "white";
    }else{
        document.body.style.color = "black";
        document.getElementsByTagName("a")[0].style.color = "black";
    }
}

//Changes select text color
function changeSelectTextColor(){
    let colors = Array.from({length: 3}, () => Math.floor(Math.random() * 256));
    let rgb = `RGBA(${colors[0]}, ${colors[1]}, ${colors[2]}, 1)`;
    let styleSheet = document.styleSheets[1];
    styleSheet.removeRule("::selection");
    styleSheet.insertRule(`::selection { background: ${rgb}; }`);
}