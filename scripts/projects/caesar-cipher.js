//HTML elements
let input = document.getElementById("inputMessage");
let output = document.getElementById("outputMessage");
let offset = document.getElementById("offset");
let encrypt = document.getElementById("encrypt");
let decrypt = document.getElementById("decrypt");

//Ciphers message
function cipher(){
    //Variables
    let charsLower = "abcdefghijklmnopqrstuvwxyz";
    let charsUpper = charsLower.toUpperCase();
    let offsetValue = offset.value;
    let newText = "";

    //Makes sure offset value has normal values
    offsetValue < 0 && (offsetValue = Math.floor(offsetValue * -1));
    offsetValue %= 26;
    offset.value = offsetValue;
    
    for(let char of input.value){
        //Only executes if char is a letter
        if(char.toLowerCase() != char.toUpperCase()){
            //Encrypt
            if(encrypt.checked){
                console.log("encrypt");
                if(char == char.toLowerCase()){
                    char = charsLower[(charsLower.indexOf(char) + offsetValue) % 26];
                }else if(char == char.toUpperCase()){
                    char = charsUpper[(charsUpper.indexOf(char) + offsetValue) % 26];
                }
            }    
            
            //Decrypt
            else if(decrypt.checked){
                console.log("decrypt");
                if(char == char.toLowerCase()){
                    let num = charsLower.indexOf(char) - offsetValue;
                    num < 0 && (num += 26);
                    char = charsLower[(num) % 26];
                }else if (char == char.toUpperCase()){
                    let num = charsUpper.indexOf(char) - offsetValue;
                    num < 0 && (num += 26);
                    char = charsUpper[(num) % 26];
                }
            }
        }
        newText += char;
    }

    output.value = newText;
}

//Swaps textboxes
function swap(){
    [input.value, output.value] = [output.value, input.value];
}