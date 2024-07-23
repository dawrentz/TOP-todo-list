//filterTab.js
import taskModule from "./taskModule";

let _currentTab = "all";

function updateCurrentTab(tab) {
    console.log(`from filterTab.js: updating ${_currentTab} to ${tab}`);
    _currentTab = tab;
    console.log(`Current _currentTab is now: '${_currentTab}'`);

}

export { updateCurrentTab };




//pass "project" or "date"?
function filterTaskListProject() {
    let filteredTaskList = [];
    
    //if selection is "all", show entire list
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
        
        //test
        console.log("from filterTab"); 
        console.log(filteredTaskList);
        return filteredTaskList;
    }
    
    export { filterTaskListProject };




    const filterTab = (() => {
    return { 
        updateCurrentTab,
        filterTaskListProject, 
        // _currentTab, //test
        // id: Math.random() // Unique ID for debugging

    };
})();

export default filterTab;
