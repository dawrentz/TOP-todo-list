import taskModule from "./taskModule";
import renderAll from "./render";
import filterTab, { updateCurrentTab, filterTaskListProject } from "./filterTab.js";

console.log("filterTab ID from eventListeners" + filterTab.id); // Should be the same across all imports


const eventModule = (() => {
    function addELtoDefSubBtn(inputs, btn) {
        btn.addEventListener("click", () => {
            // Create an array of input values
            const inputValues = Array.from(inputs).map(input => input.value);
            
            // Create a new Task with the input values array
            const temp = new taskModule.Task(...inputValues);
            taskModule.addTask(temp);
        
            renderAll(filterTaskListProject());
        });
    }

    //for filtering
    function addELtoProjectLI(liArray) {
        liArray.forEach((li) => {
            li.addEventListener("click", () => {
                // li.style = "color: red";
                // console.log("Before update:", filterTab._currentTab);
                updateCurrentTab(li.textContent);
                // updateCurrentTab(3); // Ensure this line is for testing only
                // console.log("After update:", filterTab._currentTab);
                // let tempList = filterTaskListProject();
                renderAll(filterTaskListProject());
                



            });
        });
    }
    
    return {
        addELtoDefSubBtn,
        addELtoProjectLI,
    }
})();

export default eventModule;