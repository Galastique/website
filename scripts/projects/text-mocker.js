//Changes properties
function mock(){
    let text = document.getElementById("encryptionMessage").value;
    let newText = mockify(text);
    document.getElementById("decryptionMessage").value = newText;
    text != "" && document.getElementById("decryptionMessage").removeAttribute("disabled");
}

//Generates message
function mockify(text){
    let newText = "";
    for(let char of text){
        if(isNaN(char)){
            Math.floor(Math.random() * 2) == 1 ? char = char.toLowerCase() : char = char.toUpperCase();
        }
        newText += char;
    }
    return newText;
}