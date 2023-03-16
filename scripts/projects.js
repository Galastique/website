//Import JSON data
let request = new XMLHttpRequest();
request.open("GET", "../data/projects.json", false);
request.send(null)

const projects = JSON.parse(request.responseText);
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