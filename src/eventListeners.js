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
        //add non-input elements manually
        //add textarea input
        allInputsArray.push(document.querySelector("#notes-input"));
        //add project input
        allInputsArray.push(document.querySelector("#project-input"));
        //add priority input
        allInputsArray.push(document.querySelector("#priority-input"));

        //test 
        console.log(allInputsArray[allInputsArray.length - 1].type);

        const inputValuesObj = {};
        const checkListValuesForTaskObj = [];

        //if statement requires no blank on certain inputs ================================================ need check this, where can user have blanks?
        if (
            document.querySelector("#due-date-input").value !== "" &&
            document.querySelector("#project-input").value !== ""
        ) {
            //identify all user inputs for custom populating of todo cards
            //using ":first-child" here makes an issues with the radio buttons line (first child is a label)
            allInputsArray.forEach((input) => {
                //pull out priority button selection
                if (input.type === "button" ) {
                    inputValuesObj["priority-input"] = input.textContent; //this needs be the priority button=============================================
                } 
                //pull out all check list input values for seperate array
                //only include if not blank 
                else if (input.getAttribute("class") === "check-list-input" && input.value !== "" ) {
                    checkListValuesForTaskObj.push(input.value.trim()); //no extra whitespace
                }
                //everything else gets thrown into inputVales array
                else if (input.getAttribute("class") !== "check-list-input" && input.type !== "radio" ) {
                    inputValuesObj[input.id] = input.value.trim(); //no extra whitespace
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
            inputDataAttrb.slice(0, -6), //remove "-input"
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
                //delete the project out of the list    
                taskModule.projectsListArray.splice(index, 1);
                //add the new project to the list (if not already exist)
                if (!taskModule.projectsListArray.includes(editLineInputVal)) {
                    taskModule.projectsListArray.push(editLineInputVal);
                }
            } 
            //need update all cards with the project name also 
            taskModule.tasks.forEach((task, index) => {
                if (task["project-input"] === currentLiTextContent) {
                    taskModule.tasks[index]["project-input"] = editLineInputVal;
                }
            });
        }); 

        //filters page to new edited project (if edited project was selected)
        if (filterTab._currentTab === currentLiTextContent) {
            filterTab.updateCurrentTab(editLineInputVal); 
        }

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

export function addELtoEditPriorityBtn(btn) {
    const cardElm = btn.parentElement.parentElement;
    
    
    btn.addEventListener("click", () => {
        //no need to re-render all. 
        //assign card classes based on priority? allow for diff background colors

        if (btn.textContent === "done") {
            btn.textContent = "low";
        }
        else if (btn.textContent === "low") {
            btn.textContent = "med";
        }
        else if (btn.textContent === "med") {
            btn.textContent = "high";
        }
        else if (btn.textContent === "high") {
            btn.textContent = "done";
        }

        updateTaskProp(cardElm, "priority-input", btn.textContent);
    });
};

function updateTaskProp(cardElmArg, propToEdit, newValue) {
    const taskID = cardElmArg.id;
    
    taskModule.tasks.forEach((task) => {
        if (task._idNum === +taskID) {
            task[propToEdit] = newValue;
            // console.log(taskID);
        }
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