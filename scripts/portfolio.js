import {projects} from "../data/portfolio.js";

//Displays projects in blocks
let index = 1;
for(let project of projects){
    //Create elements
    let eDiv = document.createElement("div");
    let eH2 = document.createElement("h2");
    let eP = document.createElement("p");
    let eA = document.createElement("a");
    let eImg = document.createElement("img");

    //Adds class
    eDiv.classList.add("project");
    index++ % 2 == 0 ? eDiv.classList.add("dark") : eDiv.classList.add("light");

    //Changes attributes
    eH2.innerText = project.name;
    eA.innerHTML = "View project ➜";
    eA.setAttribute("href", project.link);
    eA.setAttribute("target", "_blank");
    eImg.setAttribute("src", `../images/portfolio/${project.image}.png`);
    eImg.setAttribute("title", project.hover);
    eP.innerHTML = project.description;

    //Integrates elements
    let content = document.getElementById(project.type);
    eDiv.appendChild(eH2);
    eDiv.appendChild(eP);
    eDiv.appendChild(document.createElement("br"));
    eDiv.appendChild(eA);
    eDiv.appendChild(eImg);
    content.appendChild(eDiv);
};