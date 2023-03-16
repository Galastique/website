//Import JSON data
let request = new XMLHttpRequest();
request.open("GET", "../data/logs.json", false);
request.send(null)

const updates = JSON.parse(request.responseText);
let index = 0;

updates.reverse().forEach((update) => {
    //Update data
    let timestamp = update[0];
    let title = update[1];
    let changes = update.slice(2, update.length);

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

    //Changes text
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