//taskModule.js

let _idNum = 0;

export const tasks = [];

export class Task {
    
    
    
    constructor(obj) {
        this["description-input"] = obj["description-input"];
        this["due-date-input"] = obj["due-date-input"];
        this["notes-input"] = obj["notes-input"];
        this["priority-input"] = obj["priority-input"];
        this["project-input"] = obj["project-input"];
        this["title-input"] = obj["title-input"];
        this["check-list-inputs"] = obj["check-list-inputs"];
        this._idNum = _idNum++;
    }
}

export function addTask(task) {
    tasks.push(task);
}

export function updateProjectsList() {
    //insures that "all" is an available "project", then adds new projects
    const projectsListArray = ["all"];
    tasks.forEach((task) => {
        if (!projectsListArray.includes(task["project-input"])) {
            projectsListArray.push(task["project-input"]);
        }           
    });

    return projectsListArray;
}