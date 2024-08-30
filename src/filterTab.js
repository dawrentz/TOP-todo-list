//filterTab.js

import * as taskModule from "./taskModule.js";
import { format } from "date-fns";


//init filter to all as default
let _currentTab = "all";


export function updateCurrentTab(tab) {
    _currentTab = tab;
}

//pass "project" or "date"?
export function filterTaskListProject() {
    let filteredTaskList = [];
    
    
    //if user selection is "all", show entire list
    if (_currentTab === "all") {
        filteredTaskList = taskModule.tasks;
    } 
    
    //date filters
    else if (_currentTab === "dueToday") {
        const today = format(new Date(), "yyyy-MM-d");

        taskModule.tasks.forEach((task) => {
            if (task["due-date-input"] === today) {
                filteredTaskList.push(task);
            }
        });
    }
    else if (_currentTab === "upcoming") {
        filteredTaskList = taskModule.tasks.sort((a, b) => new Date(a["due-date-input"]) - new Date(b["due-date-input"]));
    }

    //filter based on project
    else {
        taskModule.tasks.forEach((task) => {
            if (task["project-input"] === _currentTab) {
                filteredTaskList.push(task);
            };
        });
    }
    
    return filteredTaskList;
}