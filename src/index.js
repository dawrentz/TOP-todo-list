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

const test1obj = {
    "title-input": "title1",
    "project-input": "project1",
    "description-input": "description1",
    "due-date-input": "2024-12-25",
    "priority-input": "low",
    "notes-input": "notes1",
    "check-list-inputs": ["check1"],
};
const test2obj = {
    "title-input": "title2",
    "project-input": "project2",
    "description-input": "description2",
    "due-date-input": "2024-10-04",
    "priority-input": "low",
    "notes-input": "notes2",
    "check-list-inputs": ["check2"],
};
const test3obj = {
    "title-input": "title3",
    "project-input": "project3",
    "description-input": "description3",
    "due-date-input": format(new Date(), "yyyy-MM-d"),
    "priority-input": "low",
    "notes-input": "due today",
    "check-list-inputs": ["check3", "test"],
};

const temp1 = new taskModule.Task(test1obj);
const temp2 = new taskModule.Task(test2obj);
const temp3 = new taskModule.Task(test3obj);
taskModule.addTask(temp1);   
taskModule.addTask(temp2);   
taskModule.addTask(temp3);   


//date testing

// const yesterday = "2024-08-28";
// const today = "2024-08-29";
// const tomorrow = "2024-08-30";

// const daysArray = [];
// daysArray.push(tomorrow);
// daysArray.push(yesterday);
// daysArray.push(today);

// console.log(daysArray);


// const now = format(new Date(), "yyyy-MM-d");
// console.log(now);

// daysArray.forEach((day) => {
//     if (day === now) {
//         console.log(day + " is good");
//     }
// });





//initialize
const dueTodaySidebarDiv = document.querySelector("#due-today-cat");
const upcomingSidebarDiv = document.querySelector("#upcoming-cat");
eventModule.addELtoDueToday(dueTodaySidebarDiv);
eventModule.addELtoUpcoming(upcomingSidebarDiv);

renderModule.renderAll(filterTab.filterTaskListProject());


