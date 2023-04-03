export function getJSON(fileName) {
    //I KNOW THIS METHOD IS DEPRECATED, BUT FOR SOME REASON THE BETTER, SHORTER METHOD DOESN'T WORK ON FIREFOX
    //otherwise I would just do     import projects from "../data/projects.json" assert {type: "json"};
    let request = new XMLHttpRequest();
    request.open("GET", `../data/${fileName}.json`, false);
    request.send(null)
    return JSON.parse(request.responseText);
}