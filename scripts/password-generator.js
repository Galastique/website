let generated = false;
let copied = false;

//Generates string of every character to use in generation
function getValues() {
    //Variables
    let chars_l = "abcdefghijklmnopqrstuvwxyz";
    let chars_n = "0123456789";
    let chars_s = "!@#$%^&*()-_=+`~[]{};:'\",.?<>/\\|";
    let easy = "Il|O0B'`\";:,.[]{}~^\\";
    let chars = "";
    let error = "";

    //Gets values
    let length = document.getElementById("length").value;
    let l = document.getElementById("letters").value;
    let n = document.getElementById("numbers").value;
    let s = document.getElementById("special").value;
    let e = document.getElementById("easy").value;

    //Generates characters included in password + error codes
    //Length
    if (isNaN(length)) {
        error += "You must enter a valid password length\n";
    } else if (length == "") {
        length = 24;
    } else if (length < 12) {
        error += "Your password must be at least 8 characters long\n";
    } else if (length > 80) {
        error += "Your password must not be longer than 80 characters\n";
    }

    //Letters
    if (l == "lower") {
        chars += chars_l;
    } else if (l == "upper") {
        chars += chars_l.toUpperCase();
    } else if (l == "both") {
        chars += chars_l;
        chars += chars_l.toUpperCase();
    } else if (l == "choose") {
        error += "You must select an option for letters\n";
    }

    //Numbers
    if (n == "true") {
        chars += chars_n;
    } else if (n == "choose") {
        error += "You must select an option for numbers\n";
    }

    //Special
    if (s == "true") {
        chars += chars_s;
    } else if (s == "choose") {
        error += "You must select an option for special characters\n";
    }

    //Easy
    if (e == "true") {
        for (let i = 0; i < chars.length; i++) {
            for (let j = 0; j < easy.length; j++) {
                if (chars.charAt(i) == easy.charAt(j)) {
                    chars = chars.substring(0, i) + chars.substring(i + 1, chars.length);
                    i--;
                }
            }
        }
    } else if (e == "choose") {
        error += "You must select an option for readability\n";
    }

    //Other
    if (l == "none" && n == "false" && s == "false") {
        error += "You must choose at least 1 character option to generate a password";
    }

    //Proceeds if no errors are found
    document.getElementById("error").innerText = error;
    if (error == "") {
        generate(chars, Math.floor(length));
    } else {
        animate("error");
    }
}

//Generates password
function generate(chars, length) {
    let password = "";
    for (let x = 0; x < length; x++) {
        password += chars.charAt(Math.random() * chars.length);
    }
    document.getElementById("password").value = password;
    generated = true;
    copied = false;
}

//Copies password to clipboard
function copy() {
    //Does not copy if password hasnt been generated
    if (!generated) {
        return
    }

    //Copies password
    let copyText = document.getElementById("password");
    copyText.select();
    copyText.setSelectionRange(0, 1000);
    navigator.clipboard.writeText(copyText.value);

    //Displays confirmation
    let tooltip = document.getElementById("success");
    tooltip.innerHTML = "Password copied to clipboard successfully!";
    animate("success");
    copied = true;
}

//Error message fade out animation
function animate(field) {
    document.getElementById(field).classList.remove("fadeOut");
    setTimeout(function () {
        document.getElementById(field).classList.add("fadeOut");
    }, 1);
}

//Toggle password visibility
function view() {
    let visible = document.getElementById("password").type;
    if (generated && visible == "password") {
        document.getElementById("password").type = "text";
    } else {
        document.getElementById("password").type = "password";
    }
}

//Asks user if they want to leave if they havent copied their password yet
function leaving() {
    if (generated && !copied) {
        alert("You haven't copied your generated password. Are you sure you would like to leave?");
    }
}