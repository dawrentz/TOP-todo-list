//renderAll.js

//imports
import * as taskModule from "./taskModule.js";
import * as eventModule from "./eventListeners.js";

//declarations
const contentElement = document.querySelector("#content");
const projectsListElement = document.querySelector("#projects-list");

//=============================================================
//functions
//=============================================================

//clear page for re-render
function clearContent() {
    contentElement.innerHTML = "";
}

//tool to help build DOM elements
function appendElementWithClass(elementType, className, appendHere, clone) {
    const tempElement = document.createElement(elementType);
    tempElement.classList.add(className);
    appendHere.appendChild(tempElement);
    tempElement.appendChild(clone);
    return tempElement;
}

//render projects list for sidebar selection
function renderProjectsList() {
    projectsListElement.innerHTML = "";
    const tempProjectList = taskModule.updateProjectsList();

    tempProjectList.forEach((project) => {
        const tempLi = document.createElement("li");
        tempLi.textContent = project;
        projectsListElement.appendChild(tempLi);
    });

    //collect project li's for eventListener
    const allProjectLIs = document.querySelectorAll("#projects-list li");

    //new EL goes here
    eventModule.addELtoProjectLI(allProjectLIs);

}

//add the default "add task" card to page
function defaultTodo() {
    //create DOM elements
    //use html template for form
    const todoTemplate = document.querySelector("#default-todo");
    const todoTemplateClone = document.importNode(todoTemplate.content, true);
    const defaultTodoCard = appendElementWithClass("div", "defaultTodoCard", contentElement, todoTemplateClone);
    
    //collect all form inputs and pass values to eventListener/task constructor
    const allInputs = defaultTodoCard.querySelectorAll("#default-todo-form input");    
    const todoSubmitBtn = defaultTodoCard.querySelector("#todo-sub-btn");

    eventModule.addELtoDefSubBtn(allInputs, todoSubmitBtn);
}

//add all current tasks card to page (needs to respect future filter)
export default function renderAll(taskList) {
    clearContent();
    defaultTodo();
    renderProjectsList();
    
    taskList.forEach(task => {
        
        //create DOM elements
        //use html template for card
        const newTodoTemplate = document.querySelector("#new-todo");
        const newTodoTemplateClone = document.importNode(newTodoTemplate.content, true);
        const newTodoCard = appendElementWithClass("div", "newTodoCard", contentElement, newTodoTemplateClone);
        //link idNum for later edit functions
        newTodoCard.id = task._idNum;
        
        //create array of user inputs to update DOM
        const taskPropArray = [];
        for(const prop in task) {
            taskPropArray.push(task[prop]);
        }

        //collect all new data fields for quick populating 
        const allNewTodoLines = newTodoCard.querySelectorAll(".todo-card-line span");
        
        //remove id (internal only)
        taskPropArray.pop();
        
        //loop through user info to 
        allNewTodoLines.forEach((line, index) => {
            line.textContent = taskPropArray[index];
        });
    });
}