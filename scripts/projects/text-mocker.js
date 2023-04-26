//Changes properties
function mock(){
    let text = document.getElementById("encryptionMessage").value;
    document.getElementById("decryptionMessage").value = mockify(text);
    text != "" && document.getElementById("decryptionMessage").removeAttribute("disabled");
}

//Generates mocking message
function mockify(text){
    let newText = "";
    for(let char of text){
        Math.floor(Math.random() * 2) == 1 ? char = char.toLowerCase() : char = char.toUpperCase();
        newText += char;
    }
    return newText;
}