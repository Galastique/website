import updates from "../data/logs.json" assert {type: "json"};

let index = 0;

updates.reverse().forEach((update) => {
    //Update data
    let timestamp = update.date;
    let title = update.title;
    let changes = update.changes;

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
    changeDate.innerText = timestamp;
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
});