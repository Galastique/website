const updates = [
    //date of change, title of change, list of changes made
    ["2022-06-20", "Published website", "Created and published website", "Added social media logos for social page"],
    ["2022-06-21", "Formatted code", "Organized code to make it look nicer"],
    ["2022-06-22", "Added lots of pictures", "Added website's host to footer", "Added my logo as the website icon", "Added images for projects", "Organized code"],
    ["2022-06-28", "Added new content", "Added new pages for future projects", "Added navigation bar", "Renamed files", "Renamed folders", "Changed my logo"],
    ["2022-06-29", "Minor additions", "Added titles for each page", "Added placeholder text to test visual elements", "Added line between nav bar and content", "Added files for future projects", "Removed duplicate files", "Removed unused files", "Renamed files", "Adjusted links", "Patched font size", "Changed color for password generator error message"],
    ["2022-07-05", "Minor changes", "Updated my logo", "Added text on homepage", "Adjusted page size", "Removed fade in animation from pages that aren't the home page"],
    ["2022-07-06", "Big changes", "Added projects to projects page", "Added descriptions to said projects", "Added elements for future projects", "Added title to password generator's icons", "Added keywords for SEO", "Completed random color generator project", "Renamed some files for consistancy", "Patched links on the projects page", "Minor changes to password generator", "Removed unused assets", "Cleaned up code"],
    ["2022-07-07", "First major patch", "Adjusted scale image", "Moved completed projects to top of projects list", "Reorganized code for password generator", "Added additional images for future projects", "Adjusted footer color", "Adjusted layout of projects", "Updated website description and keywords for SEO", "Created template for projects for future consistency", "Patched visual bug", "Updated overall code"],
    ["2022-07-08", "Minor changes", "Added file to mask filenames from url", "Tweaked home page title"],
    ["2022-07-09", "New content", "Added content on social page"],
    ["2022-07-11", "Minor patch", "Added files for future project", "Changed local links", "Patched bugs with urls"],
    ["2022-07-13", "New project", "Added and completed reaction test project", "Moved projects order on projects page", "Fixed back button on projects"],
    ["2022-07-14", "Quality of life changes", "Added pages for html errors", "Adjusted timing for reaction test", "Removed password generator slide in animation", "Major code optimizations"],
    ["2022-07-15", "Minor changes to projects", "Changed colors in the password generator", "Changed colors in the reaction test", "Changed projects order on projects page", "Added prompt to click on green in the reaction test", "Added animations to home page"],
    ["2022-07-20", "Minor patch", "Fixed issue with footer"],
    ["2022-08-22", "Change a word", "Changes \"longest\" to \"slowest\" in the reaction test's stats"],
    ["2022-10-27", "Updated password generator", "Changed minimum and maximum password length", "Added default password length", "Changed a word"],
    ["2022-12-28", "Major backend change", "Completely changed file structure according to standards", "Patched all of the issues that that change caused", "Updated error pages", "Changed file paths", "Changed thingy to make urls look better"],
    ["2022-12-29", "Minor update", "Added metadata to files", "Change text on home screen"],
    ["2022-12-30", "New features", "Added changelogs page", "Implemented automatic addition of new changes", "Added custom scrollbar", "Changed color generator text to white when background is too dark"],
    ["2022-12-31", "QOL update", "Finished writing all of previous changes to changelogs page", "Added CMYK, HSV & HSL color codes to color generator"],
    ["2023-01-01", "Projects backend overhaul", "Made the projects page dynamic (like this page) instead of static. (This basically means that every project gets added and formatted to the page automatically according to a text file)", "Completely remade CSS files"],
    ["2023-01-06", "New project!", "Added snake game!", "Moved snake game to top of projects", "Added \"Simon\" future project", "Patched pretty big bug with projects not linking to the projects"],
    ["2023-01-06", "Minor snake update", "Added scoreboard to snake game", "Removed ability to do a 180 in snake game", "Update project descriptions"],
    ["2023-01-10", "Minor snake tweaks", "Made snake 30ms faster", "Optimized snake code"],
    //[]
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