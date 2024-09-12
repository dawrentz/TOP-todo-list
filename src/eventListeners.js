//eventsListeners.js

import * as taskModule from "./taskModule.js";
import * as renderModule  from "./render.js";
import * as filterTab from "./filterTab.js";

//on submit button click, add new task from user inputs and re-render
export function addELtoDefSubBtn(btn) {
    btn.addEventListener("click", () => {
        //collect all form inputs (including checklist as an array) and pass values to eventListener/task constructor
        const allInputs = document.querySelectorAll("#default-todo-form input");
        //convert to array
        const allInputsArray = Array.from(allInputs);
        //add textarea input
        allInputsArray.push(document.querySelector("#notes-input"));
        //add project input
        allInputsArray.push(document.querySelector("#project-input"));

        const inputValuesObj = {};
        const checkListValuesForTaskObj = [];

        if (document.querySelector("#due-date-input").value !== "" && document.querySelector("#project-input").value !== "") {

            //identify all user inputs for custom populating of todo cards
            allInputsArray.forEach((input) => {
                //pull out radio inputs and return only the checked one's value
                if (input.type === "radio" && input.checked ) {
                    inputValuesObj["priority-input"] = input.value;
                } 
                //pull out all check list input values for seperate array
                //only include if not blank 
                else if (input.getAttribute("class") === "check-list-input" && input.value !== "" ) {
                    checkListValuesForTaskObj.push(input.value);
                }
                //everything else gets thrown into inputVales array
                else if (input.getAttribute("class") !== "check-list-input" && input.type !== "radio" ) {
                    inputValuesObj[input.id] = input.value;
                }
            });
    
            //tack checklist array onto imnputs obj (for Task creation)
            inputValuesObj["check-list-inputs"] = checkListValuesForTaskObj;
    
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
            filterTab.updateCurrentTab(getDirectTextContent(li));
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
            renderModule.renderAll(filterTab.filterTaskListProject());
        }  
    }
    
    btn.addEventListener("click", () => {
        renderModule.addInputLineText(
            btn, 
            "new project", 
            "", 
            confirmBtnFunc
        );
    });
}

export function addELtoProjectEditBtn(btn, li) {
    function confirmBtnFunc(editLineInputVal) {
        //save the clicked project name        
        let currentLiTextContent = getDirectTextContent(li);

        taskModule.projectsListArray.forEach((project, index) => {
            //loop through project list to find selected project
            if (currentLiTextContent === project ) {
                //delete the project out of the list (the project list is an illusion, everything is built from the task list)    
                taskModule.projectsListArray.splice(index, 1);
                //add the new project to the list
                taskModule.projectsListArray.push(editLineInputVal);
            } 
            //need update all cards with the project name also 
            taskModule.tasks.forEach((task, index) => {
                if (task["project-input"] === currentLiTextContent) {
                    taskModule.tasks[index]["project-input"] = editLineInputVal;
                }
            });
        }); 

        renderModule.renderProjectsList();
        renderModule.renderAll(filterTab.filterTaskListProject());
    }
    
    btn.addEventListener("click", (e) => {
        e.stopPropagation(); // Stop the event from bubbling up to the parent `li` (a click on the li will filter page by project)
        
        renderModule.addInputLineText(
            btn, 
            "new project name", 
            getDirectTextContent(li), 
            confirmBtnFunc
        );
    });
}

//textContent keeps collecting the element's text and the element's children's text. This function avoids that
function getDirectTextContent(element) {
    let text = "";
    element.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            text += node.textContent;
        }
    });
    return text;
}

export function addELtoProjectListDelBtn(btn, li) {
    //save the clicked project name        
    let currentLiTextContent = getDirectTextContent(li);

    function confirmBtnFunc() {

        taskModule.projectsListArray.forEach((project, index) => {
            //loop through project list to find selected project
            if (currentLiTextContent === project ) {
                //delete the project out of the list (the project list is an illusion, everything is built from the task list)    
                taskModule.projectsListArray.splice(index, 1);
            } 
            //need update all cards with the project name also 
            taskModule.tasks.forEach((task, index) => {
                if (task["project-input"] === currentLiTextContent) {
                    taskModule.tasks.splice(index, 1);
                }
            });
        }); 

        renderModule.renderProjectsList();
        renderModule.renderAll(filterTab.filterTaskListProject());
    }

    btn.addEventListener("click", (e) => {
        e.stopPropagation(); // Stop the event from bubbling up to the parent `li` (a click on the li will filter page by project)

        //reusing this code for the line hiding, return button, and confirm button functions. Have to modify it's input creation (don't need)
        //is it recyling? is it laziness? is it a sign that I don't know what I'm doing? Who can really say...
        renderModule.addInputLineText(
            btn, 
            "", //no need
            "", //no need
            confirmBtnFunc
        );

        //remove input element and add the proper change for the del button
        //select the new edit line
        const currentEditLine = li.nextElementSibling;
        //remove the input
        currentEditLine.querySelector("input").remove();
        //add project name back in and add delete style
        const projectNameSpan = document.createElement("span");
        projectNameSpan.textContent = currentLiTextContent;
        projectNameSpan.style = "text-decoration: line-through";
        //append ahead of buttons
        currentEditLine.prepend(projectNameSpan);
    });
}
