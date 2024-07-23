//filterTab.js

import taskModule from "./taskModule";

const filterTab = (() => {
    let _currentTab = "all";
    
    function updateCurrentTab(tab) {
        _currentTab = tab;
    }
    
    function filterTaskListProject() {
        console.log("from filterTab"); //test
        let filteredTaskList = [];


        if (_currentTab === "all") {
            filteredTaskList = taskModule.tasks;
        } 
        else {
            taskModule.tasks.forEach((task) => {
                if (task.project == _currentTab) {
                    filteredTaskList.push(task);
                };
            });
        }

        console.log(filteredTaskList);
        // return filterTaskListProject;
    }
    
    return { 
        updateCurrentTab,
        filterTaskListProject
    };
})();

export default filterTab;
