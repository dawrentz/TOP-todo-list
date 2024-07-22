//renderAll.js

//imports
import taskModule from "./taskModule";

//declarations
const contentElement = document.querySelector("#content");
const projectsListElement = document.querySelector("#projects-list");

//=============================================================
//functions
//=============================================================
function clearContent() {
    contentElement.innerHTML = "";
}

//render projects list for sidebar selection
function renderProjectsList() {
    projectsListElement.innerHTML = "";
    let tempProjectList = taskModule.updateProjectsList();

     tempProjectList.forEach((project) => {
        const tempLi = document.createElement("li");
        tempLi.textContent = project;
        projectsListElement.appendChild(tempLi);
     });

}


//add the default "add task" card
export function defaultTodo() {
    //create DOM elements
    const defaultTodoCard = document.createElement("div");
    defaultTodoCard.classList.add("defaultTodoCard");
    contentElement.appendChild(defaultTodoCard);
    
    //use html template for form
    const todoTemplate = document.querySelector("#default-todo");
    const todoTemplateClone = document.importNode(todoTemplate.content, true);
    defaultTodoCard.appendChild(todoTemplateClone);
    
    //collect all form inputs and pass values to task onstructor
    const allInputs = defaultTodoCard.querySelectorAll("input");
    
    const todoSubmitBtn = defaultTodoCard.querySelector("#todo-sub-btn");
    todoSubmitBtn.addEventListener("click", () => {
        // Create an array of input values
        const inputValues = Array.from(allInputs).map(input => input.value);
        
        // Create a new task with the input values
        const temp = new taskModule.Task(...inputValues);
        taskModule.addTask(temp);
        
        renderAll();
    });
}

//add all current tasks card to page (respects filter)
export default function renderAll() {
    clearContent();
    defaultTodo();
    renderProjectsList();
    
    taskModule.tasks.forEach(task => {
        
        //create DOM elements
        const newTodoCard = document.createElement("div");
        newTodoCard.classList.add("newTodoCard");
        contentElement.appendChild(newTodoCard);
        
        //use html template for card
        const newTodoTemplate = document.querySelector("#new-todo");
        const newTodoTemplateClone = document.importNode(newTodoTemplate.content, true);
        newTodoCard.appendChild(newTodoTemplateClone);

        const allNewTodoLines = newTodoCard.querySelectorAll(".todo-card-line span");
        
        //create array of user inputs to update DOM
        const taskPropArray = [];
        for(const prop in task) {
            taskPropArray.push(task[prop]);
        }
        //remove id (internal only)
        taskPropArray.pop();
        
        //loop through user info to 
        allNewTodoLines.forEach((line, index) => {
            line.textContent = taskPropArray[index];
        });




    });

    



    // //collect all form inputs and pass values to task onstructor
    // const allInputs = newTodoCard.querySelectorAll("input");
    
    // const todoSubmitBtn = newTodoCard.querySelector("#todo-sub-btn");
    // todoSubmitBtn.addEventListener("click", () => {
    //     // Create an array of input values
    //     const inputValues = Array.from(allInputs).map(input => input.value);
        
    //     // Create a new task with the input values
    //     const temp = new taskClass(...inputValues);
    //     addTaskFunc(temp);
    //     });

}