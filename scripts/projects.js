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

    //Doesn't let you reapply same filter
    if (document.getElementsByClassName("selectedFilter")[0].id == id) {
        return;
    }
    
    //Changes filter
    document.getElementsByClassName("selectedFilter")[0].className = "";
    document.getElementById(id).className = "selectedFilter";
    displayProjects(id);
}

//Dislays projects in blocks
function displayProjects(type) {
    document.getElementById("projects").innerHTML = "";
    
    //Loads projects
    let index = 1;
    for(let project of projects){
        //Only shows project if it's the correct type
        if (type != "all" && project.type != type) {
            continue;
        }

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
        index++ % 2 == 0 ? eDiv.setAttribute("class", "project-dark") : eDiv.setAttribute("class", "project-light");

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