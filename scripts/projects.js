const projects = [
    //project title, link to project, link to image, description
    ["Slithering Snake (completed)", "snake", "The one game that every programmer ever has made. Slithering Snake II: The Snakening Part 1.<br><br>Use the W A S D keys or the arrow keys to move around and try to eat as many fruit as possible. Watch out for that persky tail of yours! You wouldn't wanna choke would you? <br><br> It's a pretty generic snake game all things considered. I hope you enjoy it!"],
    ["Password Generator (completed)", "password-generator", "This user friendly password generator can create very secure passwords, that are virtually impossible to crack (assuming proper settings are chosen). The passwords are generated on your local device and aren't stored anywhere. <br><br> I managed to complete the generator part of this program in 1 minute and 59 seconds. The hard part was the HTML & CSS, which took me quite a while to make look at least presentable."],
    ["Reaction Test (completed)", "reaction-test", "This will test your reaction time in milliseconds. As soon as the background changes color, you have to click. Your time result will appear on screen. <br><br> Let's see if you can beat my score of 170 :)"],
    ["Random Color Generator (completed)", "color-generator", "This random color generator generates a color randomly. If you ever need colors for a project, a palette or anything else, this is the project for you. <br><br> The generated color will have its RGB, HEX, CMYK, HSV and HSL values displayed. "],
    ["Minesweeper (~70% done)", "minesweeper", "This is a pretty basic minesweeper recreation. It hasn't been implemented yet, so I don't really know what to put here, but I hope you enjoy it when it eventually comes."],
    ["Simon (not started)", "simon", "Simon, the memory game. A pattern of colors will blink, and you have to repeat it. It's pretty self explanatory. Hopefully when I actually work on it I won't forget to add sounds."],
    ["Tic-tac-toe (not started)", "tic-tac-toe", "Tic-tac-toe. When this is over, you will be able to play either with a friend or on your own with an \"AI\"."],
    ["Turtle Bot - a bot for Discord (page in progress)", "turtle-bot", "Turtle Bot is a bot that was mostly made for fun, but he can also be useful for managing small servers, as well as for easy entertainment. He is very easy to use and very likeable by all! <br><br> He has several fully functional management commands, as well as lots of fun commands. "],
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
    index % 2 != 0 ? eDiv.setAttribute("class", "project-light") : eDiv.setAttribute("class", "project-dark");

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