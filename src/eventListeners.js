//eventsListeners.js

import * as taskModule from "./taskModule.js";
import * as renderModule  from "./render.js";
import * as filterTab from "./filterTab.js";

//on submit button click, add new task from user inputs and re-render
export function addELtoDefSubBtn(btn) {
    btn.addEventListener("click", () => {
        //collect all form inputs (including checklist as an array) and pass values to eventListener/task constructor
        const allInputs = document.querySelectorAll("#default-todo-form input");
        const textareaInput = document.querySelector("#notes-input").value;

        const inputValuesObj = {};
        const checkListValuesForObj = [];

        if (document.querySelector("#due-date-input").value !== "") {

            //identify all user inputs for custom populating of todo cards
            allInputs.forEach((input) => {
                //pull out radio inputs and return only the checked one's value
                if (input.type === "radio" && input.checked ) {
                    inputValuesObj["priority-input"] = input.value;
                } 
                //pull out all check list input values for seperate array
                //only include if not blank 
                else if (input.getAttribute("class") === "check-list-input" && input.value !== "" ) {
                    checkListValuesForObj.push(input.value);
                }
                //everything else gets thrown into inputVales array
                else if (input.getAttribute("class") !== "check-list-input" && input.type !== "radio" ) {
                    inputValuesObj[input.id] = input.value;
                }
            });
    
            //include notes and checklist as array in the inputsObj
            //have to do this seperately because these two aren't "inputs" that can be easily looped through
            inputValuesObj["notes-input"] = textareaInput;
            inputValuesObj["check-list-inputs"] = checkListValuesForObj;
    
            // Create a new Task with the inputValues array
            const temp = new taskModule.Task(inputValuesObj);
            taskModule.addTask(temp);
    
            renderModule.renderAll(filterTab.filterTaskListProject());
        }
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

export function addELtoDueToday(div) {
    div.addEventListener("click", () => {
        filterTab.updateCurrentTab("dueToday");
        renderModule.renderAll(filterTab.filterTaskListProject());
    });
}

export function addELtoUpcoming(div) {
    div.addEventListener("click", () => {
        filterTab.updateCurrentTab("upcoming");
        renderModule.renderAll(filterTab.filterTaskListProject());
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

export function addELtodoLineEditBtn(btn, line) {
    const inputDataAttrb = line.getAttribute("data-from-input");
    const lineParent = line.parentElement;
    const taskID = lineParent.parentElement.id;

    function confirmBtnFunc(editLineInputVal) {
        taskModule.tasks.forEach((task) => {
            if (+taskID === task._idNum) {
                task[inputDataAttrb] = editLineInputVal;
                renderModule.renderAll(filterTab.filterTaskListProject());
            }
        });
    }

    btn.addEventListener("click", () => {
        renderModule.addInputLineText(
            btn,
            inputDataAttrb.slice(0, -6),
            line.textContent,
            confirmBtnFunc
        );
    });
}

export function addELtoAddProject(btn) {
    function confirmBtnFunc(editLineInputVal) {
        if (!taskModule.projectsListArray.includes(editLineInputVal)) {
            taskModule.projectsListArray.push(editLineInputVal);
            renderModule.renderProjectsList();
        }  
    }
    
    btn.addEventListener("click", () => {
        renderModule.addInputLineText(
            btn, 
            "project", 
            "", 
            confirmBtnFunc
        );
    });
}