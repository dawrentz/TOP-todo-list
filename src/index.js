//imports
import "./reset.css";
import "./style.css";
import defaultTodo from "./defaultTodo";
import taskModule from "./taskModule";

//DOM cache
const contentElement = document.querySelector("#content");

//initialize
defaultTodo(contentElement, taskModule.Task, taskModule.addTask);
