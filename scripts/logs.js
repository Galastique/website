const updates = [
    //date of change, title of change, list of changes made
    ["2022-06-20", "", ""],
    ["2022-06-21", "", ""],
    ["2022-06-22", "", ""],
    ["2022-06-28", "", ""],
    ["2022-06-29", "", ""],
    ["2022-07-05", "", ""],
    ["2022-07-06", "", ""],
    ["2022-07-07", "First patch", "adjusted scale image", "moved completed projects to top of projects list", "reorganized code for password generator", "added additional images for future projects", "adjusted footer color", "adjusted layout of projects", "updated website description and keywords for SEO", "created template for projects for future consistency", "patched visual bug", "updated overall code"],
    ["2022-07-08", "", ""],
    ["2022-07-09", "", ""],
    ["2022-07-11", "", ""],
    ["2022-07-13", "", ""],
    ["2022-07-14", "", ""],
    ["2022-07-15", "", ""],
    ["2022-07-20", "", ""],
    ["2022-08-22", "", ""],
    ["2022-10-27", "", ""],
    ["2022-12-28", "", ""],
    ["2022-12-29", "", ""],
    ["2022-12-30", "New features", "added changelogs tab", "implemented automatic addition of new changes", "added custom scrollbar"]
];
let index = 1;

updates.reverse().forEach((update) => {
    //Update data
    let timestamp = update[0];
    let title = update[1];
    let changes = update.slice(2, update.length);

    //Create elements
    let eDiv = document.createElement("div");
    let eH3 = document.createElement("h3");
    let eUl = document.createElement("ul");
    let eLi = [];
    let eP = document.createElement("p");
    for(let i = 0; i < changes.length; i++){
        eLi.push(document.createElement("li"));
    }

    //Adds classe
    index % 2 != 0 ? eDiv.setAttribute("class", "change-light") : eDiv.setAttribute("class", "change-dark");

    //Changes text
    eH3.innerText = title;
    changes.forEach((change) =>{
        eLi[changes.indexOf(change)].innerText = change;
        eUl.appendChild(eLi[changes.indexOf(change)]);
    });
    eP.innerText = timestamp;

    //Integrates elements
    let content = document.getElementsByClassName("content")[0];
    eDiv.appendChild(eH3);
    eDiv.appendChild(eUl);
    eDiv.appendChild(eP);
    content.appendChild(eDiv);

    index++;
});

document.getElementsByClassName("content")[0].appendChild(document.createElement("br"));
document.getElementsByClassName("content")[0].appendChild(document.createElement("br"));
document.getElementsByClassName("content")[0].appendChild(document.createElement("br"));