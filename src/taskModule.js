//taskModule.js

//should this be a class? need change when add memory?
const taskModule = (function() {
    //declarations
    const tasks = [];
    let _idNum = 0;
    
    //classes
    class Task {
        constructor(title, project, descript, dueDate, priority, notes, checkList) {
            this.title = title;
            this.project = project;
            this.descript = descript;
            this.dueDate = dueDate;
            this.priority = priority;
            this.notes = notes;
            this.checkList = checkList;
            this._idNum = _idNum++;
        }
    }
    
    //functions
    function addTask(task) {
        tasks.push(task);
        //testing
        // console.table(tasks);
    }
    
    function updateProjectsList() {
        const projectsListArray = ["all"];
        tasks.forEach((task) => {
            if (!projectsListArray.includes(task.project)) {
                projectsListArray.push(task.project);
           }           
        });
        //need delete project function - what?

        //testing
        // console.log(projectsListArray);

        return projectsListArray;
    }

    return {
        Task,
        addTask, 
        tasks,
        updateProjectsList,
    };
})();

export default taskModule;