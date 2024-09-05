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
    
    btn.addEventListener("click", () => {
        //declarations
        const lineParent = line.parentElement;
        const taskID = lineParent.parentElement.id;
        const inputDataAttrb = line.getAttribute("data-from-input");

        //hide current line, no delete because user may cancel the edit
        lineParent.style = "display: none";
        
        //create new temp line
        const editLineHTML = document.createElement("div");
        editLineHTML.className = "todo-card-line-edit";
        editLineHTML.innerHTML = `
            <input
            type="text"
            placeholder=${inputDataAttrb.slice(0, -6)}
            value=${line.textContent}>
        `;
        
        //create confirm edit button
        const confirmEditBtn = document.createElement("button");
        confirmEditBtn.className = "todo-card-line-edit-confirm-btn";
        confirmEditBtn.textContent = "✓";
        editLineHTML.appendChild(confirmEditBtn);
        //confirm button updates task prop and re-renders all
        confirmEditBtn.addEventListener("click", () => {
            taskModule.tasks.forEach((task) => {
                if (+taskID === task._idNum) {
                    const newInputVal = editLineHTML.querySelector("input").value;
                    
                    task[inputDataAttrb] = newInputVal;
                    renderModule.renderAll(filterTab.filterTaskListProject());
                }
            });
        });
        
        //create cancel edit button
        const cancelEditBtn = document.createElement("button");
        cancelEditBtn.className = "todo-card-line-edit-cancel-btn";
        cancelEditBtn.textContent = "⨯";
        editLineHTML.appendChild(cancelEditBtn);
        //cancel button deletes new HTML and reverts to before edit
        cancelEditBtn.addEventListener("click", () => {
            editLineHTML.remove();
            lineParent.style = "display: initial";
        });

        //declare input line for fancy UI 
        const editLineInput = editLineHTML.querySelector("input");
        //setting delay to have the input highlight on edit button click
        setTimeout(() => {
            editLineInput.focus();
            editLineInput.select(); // Highlight the input contents
        }, 0); // Adjust the delay if needed

        //append temp line after hidden original line
        lineParent.after(editLineHTML);
    });
}