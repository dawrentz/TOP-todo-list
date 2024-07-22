//taskModule.js

const taskModule = (function() {
    //declarations
    const tasks = [];
    let _idNum = 0;
    const _projectsListArray = ["all"];

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
        tasks.forEach((task) => {
            if (!_projectsListArray.includes(task.project)) {
                _projectsListArray.push(task.project);
           }
           
        });
        //need delete project function

        //testing
        console.log(_projectsListArray);

        return _projectsListArray;
    }

    return {
        Task,
        addTask, 
        tasks,
        updateProjectsList,
    };
})();

export default taskModule;