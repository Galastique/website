export function getJSON(fileName){
    let request = new XMLHttpRequest();
    request.open("GET", `../data/${fileName}.json`, false);
    request.send(null)
    return JSON.parse(request.responseText);
}