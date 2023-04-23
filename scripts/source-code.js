let projectName = document.getElementsByTagName("body")[0].id;

let projectFile = new XMLHttpRequest();
projectFile.open("GET", `../../scripts/projects/${projectName}.js`, false);
projectFile.onreadystatechange = function(){
    if(projectFile.readyState === 4){
        if(projectFile.status === 200 || projectFile.status == 0){
            let projectCode = projectFile.responseText;
            document.getElementsByTagName("code")[0].innerHTML = projectCode;
        }
    }
}
projectFile.send(null);