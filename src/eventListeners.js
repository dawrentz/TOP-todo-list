//eventsListeners.js

import * as taskModule from "./taskModule.js";
import * as renderModule  from "./render.js";
import * as filterTab from "./filterTab.js";

//on submit button click, add new task from user inputs and re-render
export function addELtoDefSubBtn(btn) {
    btn.addEventListener("click", () => {
        //collect all form inputs (including checklist as an array) and pass values to eventListener/task constructor
        const allInputs = document.querySelectorAll("#default-todo-form input");

        // Create an array of input values
        const inputValues = [];
        const checkListValues = [];
        
        //if a checklist item add to checklist Array
        //then push checklist array to the back of inputValues
        allInputs.forEach((input) => {
            //pull out radio inputs and return only the checked one's value
            if (
                input.type === "radio" &&
                input.checked 
            ) {
                inputValues.push(input.value);
            } 

            //pull out all check list input values for seperate array
            //only include if not blank 
            else if (
                input.getAttribute("class") === "check-list-input"  &&
                input.value !== "" 
            ) {
                checkListValues.push(input.value);
            }

            //everything else gets thrown into inputVales array
            else if (
                input.getAttribute("class") !== "check-list-input" &&
                input.type !== "radio" ) {
                    inputValues.push(input.value);
            }
        });
        //tack on check list array to all inputs array            
        inputValues.push(checkListValues);

        // Create a new Task with the inputValues array
        const temp = new taskModule.Task(...inputValues);
        taskModule.addTask(temp);

        renderModule.renderAll(filterTab.filterTaskListProject());
    });
}

//on sidebar project click, re-render with new filter
export function addELtoProjectLI(liArray) {
    //loop through all projects listed in sidebar
    liArray.forEach((li) => {
        li.addEventListener("click", () => {
            filterTab.updateCurrentTab(li.textContent);
            renderModule.renderAll(filterTab.filterTaskListProject());
        });
    });
}

export function addELtoNewCheckListItemBtn(btn) {
    btn.addEventListener("click", () => {
        renderModule.addCheckListLine();

    });
}

export function addELtoChecklistLineDelBtn(btn) {
    btn.addEventListener("click", () => {
        btn.parentElement.remove();
    });
}