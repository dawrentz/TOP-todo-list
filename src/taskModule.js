//taskModule.js

//init task ID
let _idNum = 0;
//project list outside of updateProject function so it can retain all created projects. User must manually delete project from project list
export const projectsListArray = ["all"];

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
        //task ID acts as counter giving each task a unique ID (allows cards to be updated after creation)
        this._idNum = _idNum++;
    }
}

export function addTask(task) {
    tasks.push(task);
}

export function updateProjectsList() {
    //insures that "all" is an available "project", then adds new projects
    tasks.forEach((task) => {
        if (!projectsListArray.includes(task["project-input"])) {
            projectsListArray.push(task["project-input"]);
        }           
    });

    return projectsListArray;
}