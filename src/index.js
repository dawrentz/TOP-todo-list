//index.js

//currently adding proper inputs to form (date, priority. text area)

//imports
import "./reset.css";
import "./style.css";
import renderAll from "./render.js";
import * as taskModule from "./taskModule.js";
import * as filterTab from "./filterTab.js";


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
//set currentTab to "all" on boot?
renderAll(filterTab.filterTaskListProject());


