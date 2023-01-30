const updates = [
    ["2022-06-20", "Published website", "Created and published website", "Added social media logos for social page"],
    ["2022-06-21", "Formatted code", "Organized code to make it look nicer"],
    ["2022-06-22", "Added lots of pictures", "Added website's host to footer", "Added my logo as the website icon", "Added images for projects", "Organized code"],
    ["2022-06-28", "Added new content", "Added new pages for future projects", "Added navigation bar", "Renamed files", "Renamed folders", "Changed my logo"],
    ["2022-06-29", "Minor additions", "Added titles for each page", "Added placeholder text to test visual elements", "Added line between nav bar and content", "Added files for future projects", "Removed duplicate files", "Removed unused files", "Renamed files", "Adjusted links", "Patched font size", "Changed color for password generator error message"],
    ["2022-07-05", "Minor changes", "Updated my logo", "Added text on homchangeDateage", "Adjusted page size", "Removed fade in animation from pages that aren't the home page"],
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
    ["2023-01-10", "Minor snake tweaks", "Made snake 30ms faster", "Actually prevented 180s this time", "Optimized snake code"],
    ["2023-01-12", "Minor snake & password generator changes", "Changed title text (snake)", "Removed temporary message (snake)", "Adjusted margins on text elements (snake)", "Optimized code (PG)", "Changed layout, colors and text sizes (PG)"],
    ["2023-01-14", "MineswechangeDateer", "Started mineswechangeDateer project", "Border around snake game now changes color if you win/lose", "You can now restart a game a snake with the space and enter keys", "Fixed issue with snake game grid containing gaps"],
    ["2023-01-17", "Major mineswechangeDateer update", "Mines now generate after first click", "Mines now appear as image", "Implemented flags", "Implemented left/right clicking", "Slightly adjusted colors", "Adjacent empty tiles are now automatically revealed when you click on one"],
    ["2023-01-18", "Completed mineswechangeDateer", "Removed ability to put flag on revealed tiles", "More tiles are now revealed after first click", "Added minor changes", "Patched bugs", "Pretty significant code optimization"],
    ["2023-01-19", "Minor project changes", "Fixed tiny gap in mineswechangeDateer grid", "Make base mineswechangeDateer gray color slightly darker", "Patched bug during mine generation", "Arrows keys will no longer scroll down during snake game"],
    ["2023-01-23", "Minor game updates", "Snake game now has grid to make viewing tiles easier", "MineswechangeDateer tile borders are now slightly less dark", "Added 2 new project ideas (currently in draft form)"],
    ["2023-01-24", "New project!", "Added clever coin (joke) project", "Added adjectives in front of completed projects"],
    ["2023-01-27", "Minor improvement", "All flags will now be placed when you win mineswechangeDateer"],
    ["2023-01-30", "Update", "Change a few project names", "Changed background color for projects", "Added change number to changelogs"],
    //[]
];
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