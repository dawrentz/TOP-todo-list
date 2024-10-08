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
import * as eventModule from "./eventListeners.js";


//testing
import { format } from "date-fns";
import { arEG } from "date-fns/locale";

const test1obj = {
    "title-input": "title1",
    "project-input": "project1",
    "description-input": "description1",
    "due-date-input": "2024-12-25",
    "priority-input": "low",
    "notes-input": "notes1",
    "check-list-inputs": [{value: "check1"}],
};
const test2obj = {
    "title-input": "title2",
    "project-input": "project2",
    "description-input": "description2",
    "due-date-input": "2024-10-04",
    "priority-input": "high",
    "notes-input": "notes2",
    "check-list-inputs": [{value: "check2"}],
};
const test3obj = {
    "title-input": "title3",
    "project-input": "project3",
    "description-input": "description3",
    "due-date-input": format(new Date(), "yyyy-MM-d"),
    "priority-input": "med",
    "notes-input": "due today",
    "check-list-inputs": [{value: "check3"}, {value: "test"}],
};

const temp1 = new taskModule.Task(test1obj);
const temp2 = new taskModule.Task(test2obj);
const temp3 = new taskModule.Task(test3obj);
taskModule.addTask(temp1);   
taskModule.addTask(temp2);   
taskModule.addTask(temp3);   


//initialize
const dueTodaySidebarDiv = document.querySelector("#due-today-cat");
const upcomingSidebarDiv = document.querySelector("#upcoming-cat");
const addProjectBtn = document.querySelector("#add-project-btn");
eventModule.addELtoDueToday(dueTodaySidebarDiv);
eventModule.addELtoUpcoming(upcomingSidebarDiv);
eventModule.addELtoAddProject(addProjectBtn);

renderModule.renderAll(filterTab.filterTaskListProject());



// let myObj = {
//     name: "Josh",
//     age: 34,
// };

// let myObj_serialized = JSON.stringify(myObj);

// localStorage.setItem("myObj", myObj_serialized);
// console.log(myObj_serialized);

// let myObj_deserialized = JSON.parse(localStorage.getItem("myObj"));
// console.log(myObj_deserialized);


//im so done with this project. im not going to redo it, ill just take the lessons learned and use them on the next one
//for example, there should have been an "update task function" thats called every time a task (or project) is updated. then i could add the update localStorage fucntion there. too late now, not going back
document.addEventListener("click", () => {
    console.log("localStorage tasks and projects");
    
});