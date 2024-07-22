//index.js

//imports
import "./reset.css";
import "./style.css";
import renderAll from "./render.js";
import taskModule from "./taskModule";
// import renderAll from "./render";


//DOM cache
// const contentElement = document.querySelector("#content");

//initialize
renderAll();
//and then render all of list (need memory)



//test
const temp1 = new taskModule.Task(1,2,3,4,5,6,7);
const temp2 = new taskModule.Task("a","s","d","f","g","h","j");
taskModule.addTask(temp1);   
taskModule.addTask(temp2);   
renderAll();

//track what "page" user is on to pass to render. ex: if delete on project 1, re-render object list with project 1 filter
// renderAll();