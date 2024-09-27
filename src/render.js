//renderAll.js

//imports
import * as taskModule from "./taskModule.js";
import * as eventModule from "./eventListeners.js";
import * as filterTab from "./filterTab.js";
import { format } from "date-fns";
import { differenceInHoursWithOptions } from "date-fns/fp";

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
    projectsListElement.innerHTML = "";
    const tempProjectList = taskModule.updateProjectsList();

    //loop through projects and add to DOM 
    tempProjectList.forEach((project) => {
        const projectLi = document.createElement("li");
        projectLi.textContent = project;

        //add edit and del button to each project, except on "all"
        if (project !== "all") {
            //edit button before
            const projectEditBtn = document.createElement("button");
            projectEditBtn.textContent = "edit";
            projectEditBtn.className = "edit-btn";
            projectLi.prepend(projectEditBtn);
            
            eventModule.addELtoProjectEditBtn(projectEditBtn, projectLi);
            
            //del button after
            const delBtn = document.createElement("button");
            delBtn.textContent = "×";
            delBtn.className = "del-btn";
            projectLi.appendChild(delBtn);
            
            eventModule.addELtoProjectListDelBtn(delBtn, projectLi);
        }

        projectsListElement.appendChild(projectLi);
    });
    
    //collect project li's for eventListener
    const allProjectLIs = document.querySelectorAll("#projects-list li");
    
    //clicking project name filters tasks to show only that project
    eventModule.addELtoProjectLI(allProjectLIs);
}

export function addCheckListLine(containerElmArg) { //need list container
    //create DOM for checklist (inside of defaultTodoCard)
    //using seperate template to allow for dynnamic multi-line check list items
    //select checklist line container first
    // const checklistLineFormContainer = document.querySelector("#checklist-line-form-container"); //edit to be more general so card can use?
    const checkListTemplate = document.querySelector("#checklist-line-template");
    const checkListTemplateClone = document.importNode(checkListTemplate.content, true);
    //add template to checklist container. Repeat on "add checklist item" button click
    const newCheckListLine = appendElementWithClass("div", "newCheckListLine", containerElmArg, checkListTemplateClone);

    const checklistLineDelBtn = newCheckListLine.querySelector("button");
    
    //each checklist item comes with a delBtn
    eventModule.addELtoChecklistLineDelBtn(checklistLineDelBtn);

    //return input element  for UI
    const inputElm = newCheckListLine.querySelector("input");
    return inputElm;
}
    
//add the default "add task" card to page (always comes first)
function defaultTodo() {
    //create DOM elements
    //use html template for form
    const todoTemplate = document.querySelector("#default-todo");
    const todoTemplateClone = document.importNode(todoTemplate.content, true);
    const defaultTodoCard = appendElementWithClass("div", "defaultTodoCard", contentElement, todoTemplateClone);

    //populate project dropdown list
    const projectInputList = defaultTodoCard.querySelector("#project-input");
    populateProjectDropDown(projectInputList);

    //set default due date today
    const dueDateInput = document.querySelector("#due-date-input");
    dueDateInput.value = format(new Date(), "yyyy-MM-d");
    
    //event listener for priority button selector
    const defaultPriorityBtn = document.querySelector("#priority-input");
    defaultPriorityBtn.addEventListener("click", () => {
        defaultPriorityBtn.textContent = 
            defaultPriorityBtn.textContent === "high" ? "low" : 
            defaultPriorityBtn.textContent === "low"  ? "med" : "high"
        ;
    });

    //initialize checklist line and button
    addCheckListLine(document.querySelector("#checklist-line-form-container")); 
    
    const todoSubmitBtn = defaultTodoCard.querySelector("#todo-sub-btn");
    
    //add eventListener for add check list item (creates another checklist item line with button)
    const addCheckListItemLineBtn = document.querySelector("#default-add-check-list-item-button");
    eventModule.addELtoNewCheckListItemBtn(addCheckListItemLineBtn, false);
    
    //event listener that adds new task on "add task" click
    eventModule.addELtoDefSubBtn(todoSubmitBtn);
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
        
        const allNewTodoLines = newTodoCard.querySelectorAll(".todo-card-line > :first-child"); //first child here is the element that needs the input data
        const checkListDOMelm = newTodoCard.querySelector(".checklist-list");

        //loops through the empty data lines and matches up the input data
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
            if (line.getAttribute("data-from-input") !== "priority-input" && line.className !== "checklist-list") {
                const todoLineEditBtn = document.createElement("button");
                todoLineEditBtn.textContent = "edit";
                todoLineEditBtn.className = "todo-line-edit-btn";
                line.parentElement.prepend(todoLineEditBtn);
                
                eventModule.addELtodoLineEditBtn(todoLineEditBtn, line);
            }
        });

        //add eventlistener to dropdown btn
        const dropDownBtn = newTodoCard.querySelector(".new-card-drop-down-btn");
        // eventModule.addELtoNewCardDropDownBtn(dropDownBtn);


        //add eventlistener to priority button
        const priorityBtn = newTodoCard.querySelector(".priority-line");
        eventModule.addELtoEditPriorityBtn(priorityBtn);

        // populate corresponding task obj prop to checklist field
        const checkListArray = task["check-list-inputs"];
        checkListArray.forEach((listItem) => {
            const tempLi = document.createElement('li');
            tempLi.textContent = listItem.value;
            checkListDOMelm.appendChild(tempLi);

            //isDone styling
            if (listItem.isDone === true) {
                tempLi.style = "text-decoration: line-through";
            }

            //add edit buttont to each li
            const editBtn = document.createElement("button");
            editBtn.textContent = "edit";
            editBtn.className = "checkList-edit-btn"
            tempLi.append(editBtn);

            eventModule.addELtoCheckListItemEditBtn(editBtn, listItem.value);

            //add checkOff btn to each line
            const checkOffBtn = document.createElement("button");
            checkOffBtn.textContent = "✓";
            checkOffBtn.className = "checkList-checkOff-btn"
            tempLi.prepend(checkOffBtn);

            eventModule.addELtoCheckOffListItemtBtn(checkOffBtn, listItem.value);

            //add delete btn
            const delBtn = document.createElement("button");
            delBtn.textContent = "×";
            delBtn.className = "del-btn"
            editBtn.after(delBtn);

            eventModule.addELtoDelListItemtBtn(delBtn, tempLi, listItem.value);




        });




        //add eventlistener to add list item button
        const addCheckListItemLineBtn = newTodoCard.querySelector(".card-add-check-list-item-button");
        eventModule.addELtoNewCheckListItemBtn(addCheckListItemLineBtn, true);

        //if false, it renders the whole card
        if (task.shortForm === true) {
            newTodoCard.classList.add("short-form-card")
            //getting really tired of this...
        }

        //card del btn
        const newCardDelBtn = newTodoCard.querySelector(".new-card-del-btn");
        newCardDelBtn.addEventListener("click", () =>{
            newCardDelBtn.style = "display: none";
            
            const confirmBtn = document.createElement("button");
            confirmBtn.textContent = "✓";
            confirmBtn.addEventListener("click", () => {
                taskModule.tasks.forEach((task, index) => {
                    if (+newTodoCard.id === task._idNum) {
                        taskModule.tasks.splice(index, 1);


                        renderAll(filterTab.filterTaskListProject());
                    }

                });
                
                
            });
            newCardDelBtn.after(confirmBtn);

            const cancelBtn = document.createElement("button");
            cancelBtn.textContent = "↺";
            cancelBtn.addEventListener("click", () => {
                confirmBtn.remove();
                cancelBtn.remove();
                newCardDelBtn.style = "display: initial";
            });
            confirmBtn.after(cancelBtn);
        });

        //shortform button on card
        const cardDropDownBtn = newTodoCard.querySelector(".new-card-drop-down-btn");
        eventModule.addELtoCardDropDownBtn(cardDropDownBtn, newTodoCard);



 
    });
}

export function addInputLineText(btn, tempPlaceholder, tempValue, confirmFunc) {
    const tempParentElm = btn.parentElement;
    
    //hide current line. No delete because user may cancel the edit
    tempParentElm.style = "display: none";
    
    //create new temp line
    const editLineHTML = document.createElement("div");
    editLineHTML.className = "todo-card-line-edit";
    editLineHTML.innerHTML = `
    <input
    type="text"
    placeholder="${tempPlaceholder}"
    value="${tempValue}">
    `;
    
    //check if need modify <input> (only on edits, not delete and add options)
    let inputDataType; //leaves as false for exclusions
    if (btn.className !== "del-btn" && btn.id !== "add-project-btn" && btn.className !== "checkList-edit-btn") { //delBtn, addProjectBnt, and CLbtn don't have next sibling (will throw error without if statement)
        inputDataType = btn.nextElementSibling.getAttribute("data-from-input");
        //checks for type of input and modifies the HTML
        checkInputType(inputDataType, editLineHTML, tempParentElm,tempValue);
    }
    
    //create confirm edit button
    const confirmEditBtn = document.createElement("button");
    confirmEditBtn.className = "confirm-edit-btn";
    confirmEditBtn.textContent = "✓";
    editLineHTML.appendChild(confirmEditBtn);
    
    //declare new input to get user input
    const editLineInput = editLineHTML.querySelector(":first-child"); //avoids having to write code for input, select, textarea, etc 
    
    //confirm button updates task prop and re-renders all
    confirmEditBtn.addEventListener("click", () => {
        
        //using trim() for no extra white space or blanks
        //this checks for blank inputs (the delBtn borrows this addInputLineText() function, so the expection is included)
        if (btn.className !== "del-btn" && inputDataType !== "notes-input" && editLineInput.value.trim() === "") { //delBtn doesn't have input val, and don't check notes input
            //show error message
        } else {
            //run confirm logic (confirmFunc re-renders all)
            confirmFunc(editLineInput.value.trim());
            //need include reset for addProjectBrt (is not affected by renderAll)
            editLineHTML.remove(); //delete edit line
            tempParentElm.style = "display: initial"; //reset to original (no need on confirm because re-render all)
            
        }
    });
    
    //create cancel edit button
    const cancelEditBtn = document.createElement("button");
    cancelEditBtn.className = "cancel-edit-btn";
    cancelEditBtn.textContent = "↺"; //"go back"
    editLineHTML.appendChild(cancelEditBtn);
    //cancel button deletes new HTML and reverts to before edit
    cancelEditBtn.addEventListener("click", () => {
        // editLineHTML.remove(); //delete edit line
        // tempParentElm.style = "display: initial"; //reset to original (no need on confirm because re-render all)

        renderAll(filterTab.filterTaskListProject());


    });

    //edit input line fancy UE 
    if (inputDataType !== "due-date-input" && inputDataType !== "project-input") { //no want focus on these (dropdowns) and select() <select> throws error
        //setting delay to have the input highlight on edit button click
        setTimeout(() => {
            editLineInput.focus();
            editLineInput.select(); //highlight the input contents
        }, 0); // Adjust the delay if needed
    }

    //append temp line after hidden original line
    tempParentElm.after(editLineHTML);

    return editLineInput;
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

function checkInputType(inputDataTypeArg, editLineHTMLArg, tempParentElmArg, tempValueArg) {
        if (inputDataTypeArg === "due-date-input" || inputDataTypeArg === "project-input") {
            modInputLine(inputDataTypeArg, editLineHTMLArg, tempParentElmArg, tempValueArg);
        }
}

function modInputLine(inputDataTypeArg, editLineHTMLArg, tempParentElmArg, tempValueArg) {
    if (inputDataTypeArg === "project-input") {
        editLineHTMLArg.innerHTML = `
            <select 
            id="project-input" 
            placeholder="project">
                <option value="">***select project***</option>
        `;

        //populate project dropdown list
        const projectInputList = editLineHTMLArg.querySelector("select");
        populateProjectDropDown(projectInputList);
    }

    if (inputDataTypeArg === "due-date-input") {
        //get card ID to find the original date info (non-formatted);
        const cardID = tempParentElmArg.parentElement.id;

        taskModule.tasks.forEach((task) => {
            if (task._idNum === +cardID) {
                tempValueArg = task["due-date-input"];
            }
        });
        
        editLineHTMLArg.innerHTML = `
            <input
            type="date"
            value="${tempValueArg}">
        `;
    }
}