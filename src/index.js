//imports
import "./reset.css";
import "./style.css";
import defaultTodo from "./defaultTodo";

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

function addTask(task) {
    console.log(task);
    tasks.push(task);
    console.table(tasks);
}

//DOM cache
const contentElement = document.querySelector("#content");

//initialize
defaultTodo(contentElement, Task, addTask);


// console.log(tasks);
// const test = new Task(1,2,3,4,5,6,7);
// console.log(test);
// test.addTask();

// console.log(tasks);
// console.log(tasks[0].title);