import {projects} from "../data/projects.js";

document.getElementById("filter").onmouseup = changeFilter;
displayProjects("all");

//Changes which filter is applied
function changeFilter(e) {
    //Finds clicked element
    let id = "";
    if (e.target.id == "filter" || (e.target.id == "" && e.target.parentElement.id == "")) {
        return;
    }
    e.target.id == "" ? (id = e.target.parentElement.id) : (id = e.target.id);

    //Changes filter if it's different than the current one
    if (document.getElementsByClassName("selectedFilter")[0].id != id) {
        document.getElementsByClassName("selectedFilter")[0].className = "";
        document.getElementById(id).className = "selectedFilter";
        displayProjects(id);
    }
}

//Displays projects in blocks
function displayProjects(type) {
    document.getElementById("projects").innerHTML = "";

    let index = 1;
    for(let project of projects){
        //Only shows project if it's the correct type
        if (type != "all" && project.type != type) {
            continue;
        }

        //Create elements
        let eDiv = document.createElement("div");
        let eH2 = document.createElement("h2");
        let eP = document.createElement("p");
        let eA = document.createElement("a");
        let eA2 = document.createElement("a");
        let eImg = document.createElement("img");

        //Adds class
        eDiv.classList.add("project");
        index++ % 2 == 0 ? eDiv.classList.add("dark") : eDiv.classList.add("light");

        //Changes attributes
        eH2.innerText = `${project.adjectives[Math.floor(Math.random() * project.adjectives.length)]} ${project.name}`;
        eA.innerHTML = "View project ➜";
        eA2.innerText = "View source code ➜";
        eA.setAttribute("href", `./${project.link}.html`);
        eA2.setAttribute("href", `./source-code/${project.link}.html`);
        eA2.setAttribute("target", "_blank");
        eImg.setAttribute("src", `../images/icons/${project.link}.png`);
        eImg.setAttribute("title", project.hover);
        eP.innerHTML = project.description;

        //Integrates elements
        let content = document.getElementById("projects");
        eDiv.appendChild(eH2);
        eDiv.appendChild(eP);
        eDiv.appendChild(document.createElement("br"));
        eDiv.appendChild(eA);
        eDiv.appendChild(eA2);
        eDiv.appendChild(eImg);
        content.appendChild(eDiv);
    };
}