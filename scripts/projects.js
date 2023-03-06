const projects = [
    //project title, link to project, link to image, description
    ["Mighty Minesweeper", "minesweeper", "In case you were born after the year 2000, here is how you play: Your goal is to find every single mine. The numbers indicate how many mines are around it (corners included). You can right click to place a flag, which will help you keep track of what you've found. It'll also prevent you from accidentally setting off a mine.<br><br>Overall, this is a pretty basic minesweeper recreation. I am very proud of it and I hope you enjoy playing it as much as I enjoyed making it."],
    ["Savage Snake", "snake", "The one game that every programmer ever has made. Savage Snake II: The Snakening Part 1.<br><br>Use the W A S D keys or the arrow keys to move around and try to eat as many fruit as possible. Watch out for that persky tail of yours! You wouldn't wanna choke would you? <br><br> It's a pretty generic snake game all things considered. I hope you enjoy it!"],
    ["Rapid Reaction", "reaction-test", "This will test your reaction time in milliseconds. As soon as the background changes color, you have to click. Your time result will appear on screen. <br><br> Let's see if you can beat my score of 149 :)"],
    ["Cool Color Generator", "color-generator", "This random color generator generates a color randomly. If you ever need colors for a project, a palette or anything else, this is the project for you. <br><br> The generated color will have its RGB, HEX, CMYK, HSV and HSL values displayed. "],
    ["Proper Password Generator", "password-generator", "This user friendly password generator can create very secure passwords, that are virtually impossible to crack (assuming proper settings are chosen). The passwords are generated on your local device and aren't stored anywhere. <br><br> I managed to complete the generator part of this program in 1 minute and 59 seconds. The hard part was the HTML & CSS, which took me quite a while to make look at least presentable."],
    ["Clever Coin", "coin", "It's a coin. <br><br>It randomly shows either head or tails."],
    ["Simple Simon (not yet implemented)", "simon", "Simon, the memory game. A pattern of colors will blink, and you have to repeat it. It's pretty self explanatory. Hopefully when I actually work on it I won't forget to add sounds."],
    ["Handy Hangman (not yet implemented)", "hangman", "Hangman: The darkest child's game that exists. This hangman game has a semi-custom word list that contains 40,000+ words!"],
    ["Tactical Tic-tac-toe (not yet implemented)", "tic-tac-toe", "Tic-tac-toe. When this is over, you will be able to play either with a friend or on your own with an \"AI\"."],
    //["Turtle Bot - a bot for Discord (page coming soon)", "turtle-bot", "Turtle Bot is a bot that was mostly made for fun, but he can also be useful for managing small servers, as well as for easy entertainment. He is very easy to use and very likeable by all! <br><br> He has several fully functional management commands, as well as lots of fun commands. "],
    //[]
];
let index = 1;

projects.forEach((project) => {
    //Project data
    let title = project[0];
    let link = `./${project[1]}.html`;
    let image = `../images/${project[1]}.png`;
    let description = project[2];

    //Create elements
    let eDiv = document.createElement("div");
    let eH2 = document.createElement("h2");
    let eP = document.createElement("p");
    let eA = document.createElement("a");
    let eImg = document.createElement("img");

    //Adds classe
    index % 2 == 0 ? eDiv.setAttribute("class", "project-dark") : eDiv.setAttribute("class", "project-light");

    //Changes text
    eH2.innerText = title;
    eA.innerText = "View project ➜";
    eA.setAttribute("href", link);
    eImg.setAttribute("src", image);
    eP.innerHTML = description;

    //Integrates elements
    let content = document.getElementsByClassName("content")[0];
    eDiv.appendChild(eH2);
    eDiv.appendChild(eP);
    eDiv.appendChild(document.createElement("br"));
    eDiv.appendChild(eA);
    eDiv.appendChild(eImg);
    content.appendChild(eDiv);

    index++;
});