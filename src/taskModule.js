//taskModule.js

const taskModule = (function() {
    //declarations
    const tasks = [];
    let idNum = 0;

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
            this.idNum = idNum++;
        }
    }

    //functions
    function addTask(task) {
        tasks.push(task);
        //testing
        // console.table(tasks);
    }

    return {
        Task,
        addTask, 
        tasks
    };
})();

export default taskModule;