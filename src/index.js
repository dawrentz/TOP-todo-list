//index.js

//ideas_______________
//currently adding proper inputs to form (date, priority. text area, multipl check list items)
//confirm delete "delete this?" "yep" "nope". or "you sure about that?" "uh huh" "nuh uh" "maybe? math.random()"

//imports
import "./reset.css";
import "./style.css";
import * as renderModule from "./render.js";
import * as taskModule from "./taskModule.js";
import * as filterTab from "./filterTab.js";


//testing
const temp1 = new taskModule.Task(
    "title1",
    "project1",
    "description1",
    "2024-10-04",
    "low",
    "notes1",
    ["check1"]);
taskModule.addTask(temp1);   
const temp2 = new taskModule.Task(
    "title2",
    "project2",
    "description2",
    "2024-11-26",
    "med",
    "notes2",
    ["check2"]);
taskModule.addTask(temp2);   
const temp3 = new taskModule.Task(
    "title3",
    "project2",
    "description3",
    "2024-12-25",
    "high",
    "notes3",
    ["check3", "test"]);
taskModule.addTask(temp3);   


//initialize
//set currentTab to "all" on boot?
renderModule.renderAll(filterTab.filterTaskListProject());


