//filterTab.js

import * as taskModule from "./taskModule.js";

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
    //filter based on project
    else {
        taskModule.tasks.forEach((task) => {
            if (task.project === _currentTab) {
                filteredTaskList.push(task);
            };
        });
    }
    
    return filteredTaskList;
}