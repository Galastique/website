import {getJSON} from "./getJsonData.js"

const updates = getJSON("logs");
let index = 0;

for(let update of updates.reverse()){
    //Update data
    let title = update.title;
    let changes = update.changes;
    let timestamp = new Date(update.date.split("-"));

    //Create elements
    let change = document.createElement("div");
    let changeTitle = document.createElement("h3");
    let changeList = document.createElement("ul");
    let changeChanges = [];
    let changeDate = document.createElement("p");
    let changeNumber = document.createElement("div");
    let changeNumberText = document.createElement("p");
    for(let i = 0; i < changes.length; i++){
        changeChanges.push(document.createElement("li"));
    }

    //Adds classes
    index % 2 != 0 ? change.setAttribute("class", "change-light") : change.setAttribute("class", "change-dark");
    changeNumber.setAttribute("class", "change-number")

    //Changes attributes
    changeTitle.innerText = title;
    changes.forEach((change) =>{
        changeChanges[changes.indexOf(change)].innerText = change;
        changeList.appendChild(changeChanges[changes.indexOf(change)]);
    });
    changeDate.innerText = timestamp.toLocaleDateString(); //local date format(?)
    //changeDate.innerText = timestamp.toDateString(); //"Sun Apr 23 2023" format
    //changeDate.innerText = timestamp.toISOString().substring(0, 10); //2023-04-23 format
    changeNumberText.innerText = `Update #${updates.length - index}`;

    //Integrates elements
    let content = document.getElementsByClassName("content")[0];
    change.appendChild(changeTitle);
    changeNumber.appendChild(changeNumberText);
    change.appendChild(changeNumber);
    change.appendChild(changeList);
    change.appendChild(changeDate);
    content.appendChild(change);

    index++;
};