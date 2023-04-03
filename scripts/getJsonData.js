import projects from "../data/projects.json" assert {type: "json"};
import logs from "../data/logs.json" assert {type: "json"};
import hangman from "../data/hangman.json" assert {type: "json"};

const dataList = [
    ["projects", "logs", "hangman"],
    [projects, logs, hangman]
];

export function getJSON(fileName) {
    let isFirefox = typeof InstallTrigger !== 'undefined';

    if(isFirefox){
        //I KNOW THIS METHOD IS DEPRECATED, BUT FOR SOME REASON THE BETTER, SHORTER METHOD DOESN'T WORK ON FIREFOX
        let request = new XMLHttpRequest();
        request.open("GET", `../data/${fileName}.json`, false);
        request.send(null)
        return JSON.parse(request.responseText);
    }else{
        return dataList[1][dataList[0].indexOf(fileName)];
    }
}