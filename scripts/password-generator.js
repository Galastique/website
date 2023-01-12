//Password characters
const chars_l = "abcdefghijklmnopqrstuvwxyz";
const chars_n = "0123456789";
const chars_s = "!@#$%^&*()-_=+`~[]{};:'\",.?<>/\\|";
const easy = "Il|O0B'`\";:,.[]{}~^\\";

let generated = false;
let prompted = false;
let copied = false;

//Checks if selected options are correct
function validate(){
    let chars = "";
    let error = "";

    //Gets values
    let length = document.getElementsByTagName("input")[0].value;
    let l = document.getElementsByTagName("select")[0].value;
    let n = document.getElementsByTagName("select")[1].value;
    let s = document.getElementsByTagName("select")[2].value;
    let e = document.getElementsByTagName("select")[3].value;

    //Length
    if(isNaN(length)){
        error += "You must enter a valid password length\n";
    }else if(length == ""){
        length = 24;
    }else if(length < 12){
        error += "Your password must be at least 12 characters long\n";
    }else if(length > 80){
        error += "Your password must not be longer than 80 characters\n";
    }

    //Letters
    if(l == "lower"){
        chars += chars_l;
    }else if(l == "upper"){
        chars += chars_l.toUpperCase();
    }else if(l == "both"){
        chars += chars_l;
        chars += chars_l.toUpperCase();
    }else if(l == "choose"){
        error += "You must select an option for letters\n";
    }

    //Numbers
    if(n == "true"){
        chars += chars_n;
    }else if(n == "choose"){
        error += "You must select an option for numbers\n";
    }

    //Special
    if(s == "true"){
        chars += chars_s;
    }else if(s == "choose"){
        error += "You must select an option for special characters\n";
    }

    //Easy
    if(e == "true"){
        for (let i = 0; i < chars.length; i++){
            for (let j = 0; j < easy.length; j++){
                if(chars.charAt(i) == easy.charAt(j)){
                    chars = chars.substring(0, i) + chars.substring(i + 1, chars.length);
                    i--;
                }
            }
        }
    }else if(e == "choose"){
        error += "You must select an option for readability\n";
    }

    //Other
    if(l == "none" && n == "false" && s == "false"){
        error += "You must choose at least 1 character option to generate a password";
    }

    document.getElementById("error").innerText = error;

    //Proceeds if no errors are found
    if(error == ""){
        generate(chars, Math.floor(length));
    }else {
        animate("error");
    }
}

//Generates password
function generate(chars, length){
    let password = "";
    for (let x = 0; x < length; x++){
        password += chars.charAt(Math.random() * chars.length);
    }
    document.getElementById("password").value = password;
    generated = true;
    prompted = false;
    copied = false;
}

//Copies password to clipboard
function copy(){
    //Does not copy if password hasnt been generated
    if(!generated){
        return
    }

    //Copies password
    let copyText = document.getElementById("password");
    copyText.select();
    copyText.setSelectionRange(0, 1000);
    navigator.clipboard.writeText(copyText.value);

    //Displays confirmation
    document.getElementById("success").innerHTML = "Password copied to clipboard successfully!";
    copied = true;
    animate("success");
}

//Toggle password visibility
function view(){
    let visible = document.getElementById("password").type;
    if(generated && visible == "password"){
        document.getElementById("password").type = "text";
    }else {
        document.getElementById("password").type = "password";
    }
}

//Error message fade out animation
function animate(field){
    document.getElementById(field).classList.remove("fadeOut");
    setTimeout(function (){
        document.getElementById(field).classList.add("fadeOut");
    }, 1);
}

//Asks user if they want to leave if they havent copied their password yet
function leaving(){
    if(generated && !copied && !prompted){
        alert("You haven't copied your generated password. Are you sure you would like to leave?");
        prompted = true;
    }
}