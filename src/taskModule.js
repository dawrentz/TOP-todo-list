const taskModule = (function() {
    //declarations
    const tasks = [];

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
        }
    }

    //functions
    function addTask(task) {
        tasks.push(task);
        console.table(tasks);
    }

    return {
        Task,
        addTask
    };
})();

export default taskModule;