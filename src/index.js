//index.js

//imports
import "./reset.css";
import "./style.css";
import renderAll from "./render.js";
import taskModule from "./taskModule";
import filterTab from "./filterTab.js";
//track what "page" user is on to pass to render. ex: if delete on project 1, re-render object list with project 1 filter
//init to "all", pass to renderAll
//eventListeners on sidebar li's (edit render.js) that update the current tab selection
//need do all in render? kinda makes sense
//make filter.js? similar to the 

//DOM cache
// const contentElement = document.querySelector("#content");

console.log("filterTab ID from index" + filterTab.id); // Should be the same across all imports



//testing
const temp1 = new taskModule.Task(
    "title1",
    "project1",
    "description1",
    "due1",
    "priority1",
    "notes1",
    "check1");
taskModule.addTask(temp1);   
const temp2 = new taskModule.Task(
    "title2",
    "project2",
    "description2",
    "due2",
    "priority2",
    "notes2",
    "check2");
taskModule.addTask(temp2);   
const temp3 = new taskModule.Task(
    "title3",
    "project2",
    "description3",
    "due3",
    "priority3",
    "notes3",
    "check3");
taskModule.addTask(temp3);   


//initialize
renderAll(taskModule.tasks);
//and then render all of list (need memory)

//testing
filterTab.filterTaskListProject();

import eventModule from "./eventListeners.js";
// eventModule.test();

