//eventsListeners.js

import * as taskModule from "./taskModule.js";
import renderAll from "./render.js";
import * as filterTab from "./filterTab.js";

//on submit button click, add new task from user inputs and re-render
export function addELtoDefSubBtn(inputs, btn) {
    btn.addEventListener("click", () => {
        // Create an array of input values
        const inputValues = Array.from(inputs).map(input => input.value);
        
        // Create a new Task with the inputValues array
        const temp = new taskModule.Task(...inputValues);
        taskModule.addTask(temp);
    
        renderAll(filterTab.filterTaskListProject());
    });
}

//on sidebar project click, re-render with new filter
export function addELtoProjectLI(liArray) {
    //loop through all projects listed in sidebar
    liArray.forEach((li) => {
        li.addEventListener("click", () => {
            filterTab.updateCurrentTab(li.textContent);
            renderAll(filterTab.filterTaskListProject());
        });
    });
}