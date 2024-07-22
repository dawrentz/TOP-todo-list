//defaultTodo.js

import taskModule from "./taskModule";
import renderAll from "./renderAll";

const contentElement = document.querySelector("#content");


export default function defaultTodo() {
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