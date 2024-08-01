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
    //may not want to delete all projects (on last delete, user may want to keep the project catergory) 
    projectsListElement.innerHTML = "";
    const tempProjectList = taskModule.updateProjectsList();
    
    tempProjectList.forEach((project) => {
        const tempLi = document.createElement("li");
        tempLi.textContent = project;
        projectsListElement.appendChild(tempLi);
    });
    
    //collect project li's for eventListener
    const allProjectLIs = document.querySelectorAll("#projects-list li");
    
    eventModule.addELtoProjectLI(allProjectLIs);
}

export function addCheckListLine() {
    //select and delet


    //create DOM for checklist (inside of defaultTodoCard)
    //using seperate template to allow for dynnamic multi-line check list items
    //select checklist line container first
    const checklistLineFormContainer = document.querySelector("#checklist-line-form-container");
    const checkListTemplate = document.querySelector("#checklist-line-template");
    const checkListTemplateClone = document.importNode(checkListTemplate.content, true);
    //add template to checklist container. Repeat on "add checklist item" button click
    const newCheckListLine = appendElementWithClass("div", "newCheckListLine", checklistLineFormContainer, checkListTemplateClone);

    const checklistLineDelBtn = newCheckListLine.querySelector("button");

    eventModule.addELtoChecklistLineDelBtn(checklistLineDelBtn);
    
}

//add the default "add task" card to page

function defaultTodo() {
    //create DOM elements
    //use html template for form
    const todoTemplate = document.querySelector("#default-todo");
    const todoTemplateClone = document.importNode(todoTemplate.content, true);
    const defaultTodoCard = appendElementWithClass("div", "defaultTodoCard", contentElement, todoTemplateClone);
    
    //initialize checklist line and button
    addCheckListLine();
    
    

    const todoSubmitBtn = defaultTodoCard.querySelector("#todo-sub-btn");
    
    //add eventListener for add check list item (creates another checklist item line with button)
    const addCheckListItemLineBtn = document.querySelector("#default-add-check-list-item-button"); //edit selector
    eventModule.addELtoNewCheckListItemBtn(addCheckListItemLineBtn);

    //event listener that adds new task on "add task" click
    eventModule.addELtoDefSubBtn(todoSubmitBtn);
    
    
    
    
    
    
    
    
    
    
}

//add all current tasks card to page (needs to respect future filter)
//for more robust editing, it would be wise to link individual task lines to their individual obj properties (allow for restructuring of DOM). 
    //right now it all just in the same order as the template and you just loop through the data, adding as you go
export function renderAll(taskList) {
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
        //remove id (internal only)
        taskPropArray.pop();
        //serperate checkList array from properties array
        const checkListArray = taskPropArray.pop();

        //collect  all new data fields elements for quick populating
        const allNewTodoLines = newTodoCard.querySelectorAll(".todo-card-line span");
        const checkListDOMelm = newTodoCard.querySelector(".checklist-list");
    
        //loop through user info and populate corresponding field to (non-checklist)
        allNewTodoLines.forEach((line, index) => {
            line.textContent = taskPropArray[index];
        });
        
        //loop through user info and populate corresponding field to (checklist)
        checkListArray.forEach((listItem) => {
            const tempLi = document.createElement('li');
            tempLi.textContent = listItem;
            checkListDOMelm.appendChild(tempLi);
        });
        
    });
}