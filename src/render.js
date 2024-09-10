//renderAll.js

//imports
import * as taskModule from "./taskModule.js";
import * as eventModule from "./eventListeners.js";
import { format } from "date-fns";

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

//tool to help build DOM elements with templates
function appendElementWithClass(elementType, className, appendHere, clone) {
    const tempElement = document.createElement(elementType);
    tempElement.classList.add(className);
    appendHere.appendChild(tempElement);
    tempElement.appendChild(clone);
    return tempElement;
}

//render projects list for sidebar selection
export function renderProjectsList() {
    //may not want to delete all projects (on last delete, user may want to keep the project catergory) 
    projectsListElement.innerHTML = "";
    const tempProjectList = taskModule.updateProjectsList();
    //remove "all" from top, sort a-z, then and "all" back to top
    tempProjectList.shift();
    tempProjectList.sort();
    tempProjectList.unshift("all");

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

    //populate project dropdown list
    const projectInputList = defaultTodoCard.querySelector("#project-input");
    populateProjectDropDown(projectInputList);
    
    //initialize checklist line and button
    addCheckListLine();
    
    const todoSubmitBtn = defaultTodoCard.querySelector("#todo-sub-btn");
    
    //add eventListener for add check list item (creates another checklist item line with button)
    const addCheckListItemLineBtn = document.querySelector("#default-add-check-list-item-button"); //edit selector
    eventModule.addELtoNewCheckListItemBtn(addCheckListItemLineBtn);
    
    //event listener that adds new task on "add task" click
    eventModule.addELtoDefSubBtn(todoSubmitBtn);
}

function populateProjectDropDown(dropdownElm) {
    taskModule.projectsListArray.forEach((project) => {
        if (project !== "all") {
            const tempProjectOption = document.createElement("option");
            tempProjectOption.textContent = project;
            tempProjectOption.value = project
            dropdownElm.appendChild(tempProjectOption);
        }
    }); 
}
export function renderAll(taskList) {
    clearContent();
    renderProjectsList();
    defaultTodo();
    
    taskList.forEach(task => {
        //create DOM elements
        //use html template for card
        const newTodoTemplate = document.querySelector("#new-todo");
        const newTodoTemplateClone = document.importNode(newTodoTemplate.content, true);
        const newTodoCard = appendElementWithClass("div", "newTodoCard", contentElement, newTodoTemplateClone);
        //link idNum for later edit functions
        newTodoCard.id = task._idNum;

        const allNewTodoLines = newTodoCard.querySelectorAll(".todo-card-line span");
        const checkListDOMelm = newTodoCard.querySelector(".checklist-list");

        
        for(const prop in task) {
            allNewTodoLines.forEach((line) => {
                if (line.getAttribute("data-from-input") === prop) {
                    line.textContent = task[prop];
                }
                
                //date styling
                if (prop === "due-date-input" && line.className === "due-line") {
                    const dateValue = new Date(line.textContent);
                    const utcDate = new Date(dateValue.getUTCFullYear(), dateValue.getUTCMonth(), dateValue.getUTCDate());
                    //lowercase styling
                    line.textContent = format(utcDate, "MMM do, yyyy (E)").toLowerCase();
                }
            });
        }
        
        //add edit button to each new todo line (not check list)
        allNewTodoLines.forEach((line) => {
            const todoLineEditBtn = document.createElement("button");
            todoLineEditBtn.textContent = "edit";
            todoLineEditBtn.className = "todo-line-edit-btn";
            line.parentElement.prepend(todoLineEditBtn);

            eventModule.addELtodoLineEditBtn(todoLineEditBtn, line);
        });
    
        // populate corresponding task obj prop to checklist field
        const checkListArray = task["check-list-inputs"];
        checkListArray.forEach((listItem) => {
            const tempLi = document.createElement('li');
            tempLi.textContent = listItem;
            checkListDOMelm.appendChild(tempLi);
        });
    });
}

export function addInputLineText(btn, TempPlaceholder, TempValue, confirmFunc) {
    const tempParentElm = btn.parentElement;

    //hide current line. No delete because user may cancel the edit
    tempParentElm.style = "display: none";
    
    //create new temp line
    const editLineHTML = document.createElement("div");
    editLineHTML.className = "todo-card-line-edit";
    editLineHTML.innerHTML = `
        <input
        type="text"
        placeholder=${TempPlaceholder}
        value=${TempValue}>
    `;

    //create confirm edit button
    const confirmEditBtn = document.createElement("button");
    confirmEditBtn.className = "confirm-edit-btn";
    confirmEditBtn.textContent = "✓";
    editLineHTML.appendChild(confirmEditBtn);

    //confirm button updates task prop and re-renders all
    confirmEditBtn.addEventListener("click", () => {
        if (btn.id === "add-project-btn" && editLineInput.value === "") {
            //nothing
        } else {
            confirmFunc(editLineInput.value);
            //below is to reset the add project button (renderAll only renders the cards)
            editLineHTML.remove();
            tempParentElm.style = "display: initial";
        }
    });

    //create cancel edit button
    const cancelEditBtn = document.createElement("button");
    cancelEditBtn.className = "cancel-edit-btn";
    cancelEditBtn.textContent = "↺";
    editLineHTML.appendChild(cancelEditBtn);
    //cancel button deletes new HTML and reverts to before edit
    cancelEditBtn.addEventListener("click", () => {
        editLineHTML.remove();
        tempParentElm.style = "display: initial";
    });

    //declare input line for fancy UI 
    const editLineInput = editLineHTML.querySelector("input");
    //setting delay to have the input highlight on edit button click
    setTimeout(() => {
        editLineInput.focus();
        editLineInput.select(); // Highlight the input contents
    }, 0); // Adjust the delay if needed

    //append temp line after hidden original line
    tempParentElm.after(editLineHTML);
}