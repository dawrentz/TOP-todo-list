//taskModule.js

let _idNum = 0;

export const tasks = [];

export class Task {
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

export function addTask(task) {
    tasks.push(task);
}

export function updateProjectsList() {
    const projectsListArray = ["all"];
    tasks.forEach((task) => {
        if (!projectsListArray.includes(task.project)) {
            projectsListArray.push(task.project);
        }           
    });

    return projectsListArray;
}