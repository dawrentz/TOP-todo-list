//filterTab.js

import * as taskModule from "./taskModule.js";
import { format } from "date-fns";


//init filter to all as default
export let _currentTab = "all";


export function updateCurrentTab(tab) {
    _currentTab = tab;
}

//pass "project" or "date"?
export function filterTaskListProject() {
    //set init filter to decreasing priority, then due date (maintains nice order with repeat due dates and no reordering from default "all" to "upcoming")
    let initTaskList = [];
    //adds high first, then med, low, and done
    taskModule.tasks.forEach((task) => {
        if (task["priority-input"] === "high") {
            initTaskList.push(task);
        }
    });
    taskModule.tasks.forEach((task) => {
        if (task["priority-input"] === "med") {
            initTaskList.push(task);
        }
    });
    taskModule.tasks.forEach((task) => {
        if (task["priority-input"] === "low") {
            initTaskList.push(task);
        }
    });
    taskModule.tasks.forEach((task) => {
        if (task["priority-input"] === "done") {
            initTaskList.push(task);
        }
    });
    //now organize by increasing due date (allows high priority to appear first if multiple cards with same due date)
    initTaskList = initTaskList.sort((a, b) => new Date(a["due-date-input"]) - new Date(b["due-date-input"]));
    
    let filteredTaskList = [];
    
    
    //if user selection is "all", show entire list
    if (_currentTab === "all") {
        filteredTaskList = initTaskList;
    } 
    
    //date filters
    else if (_currentTab === "dueToday") {
        const today = format(new Date(), "yyyy-MM-d");

        initTaskList.forEach((task) => {
            if (task["due-date-input"] === today) {
                filteredTaskList.push(task);
            }
        });
    }
    else if (_currentTab === "upcoming") {
        //already ordered by increasing due date with the default filter
        filteredTaskList = initTaskList;
    }

    //filter based on project
    else {
        initTaskList.forEach((task) => {
            if (task["project-input"] === _currentTab) {
                filteredTaskList.push(task);
            };
        });
    }
    
    return filteredTaskList;
}