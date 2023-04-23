import {getJSON} from "./getJsonData.js"

const projects = getJSON("projects");
let index = 1;

for(let project of projects){
    //Project data
    let adjective = project.adjectives[Math.floor(Math.random() * project.adjectives.length)];
    let title = `${adjective} ${project.name}`;
    let link = `./${project.link}.html`;
    let sourceLink = `./source-code/${project.link}.html`;
    let image = `../images/icons/${project.link}.png`;
    let description = project.description;

    //Create elements
    let eDiv = document.createElement("div");
    let eH2 = document.createElement("h2");
    let eP = document.createElement("p");
    let eA = document.createElement("a");
    let eA2 = document.createElement("a");
    let eImg = document.createElement("img");

    //Adds class
    index % 2 == 0 ? eDiv.setAttribute("class", "project-dark") : eDiv.setAttribute("class", "project-light");

    //Changes attributes
    eH2.innerText = title;
    eA.innerHTML = "View project ➜";
    eA2.innerText = "View source code ➜";
    eA.setAttribute("href", link);
    eA2.setAttribute("href", sourceLink);
    eA2.setAttribute("target", "_blank");
    eImg.setAttribute("src", image);
    eP.innerHTML = description;

    //Integrates elements
    let content = document.getElementsByClassName("content")[0];
    eDiv.appendChild(eH2);
    eDiv.appendChild(eP);
    eDiv.appendChild(document.createElement("br"));
    eDiv.appendChild(eA);
    eDiv.appendChild(eA2);
    eDiv.appendChild(eImg);
    content.appendChild(eDiv);

    index++;
};