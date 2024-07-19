export default function defaultTodo(contentElement) {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todoCard");
    todoCard.textContent = "card element";
    contentElement.appendChild(todoCard);
    
    const todoCardTitle = document.createElement("div");
    todoCardTitle.classList.add("todoCardTitle");
    todoCardTitle.textContent = "card title element";
    todoCard.appendChild(todoCardTitle);
    
    const todoCardProject = document.createElement("div");
    todoCardProject.classList.add("todoCardProject");
    todoCardProject.textContent = "card Project element";
    todoCard.appendChild(todoCardProject);

    const todoCardDescrip = document.createElement("div");
    todoCardDescrip.classList.add("todoCardDescrip");
    todoCardDescrip.textContent = "card descript element";
    todoCard.appendChild(todoCardDescrip);
    
    const todoCardDueDate = document.createElement("div");
    todoCardDueDate.classList.add("todoCardDueDate");
    todoCardDueDate.textContent = "card dueDate element";
    todoCard.appendChild(todoCardDueDate);
    
    const todoCardPriority = document.createElement("div");
    todoCardPriority.classList.add("todoCardPriority");
    todoCardPriority.textContent = "card Priority element";
    todoCard.appendChild(todoCardPriority);
    
    const todoCardNotes = document.createElement("div");
    todoCardNotes.classList.add("todoCardNotes");
    todoCardNotes.textContent = "card Notes element";
    todoCard.appendChild(todoCardNotes);
    
    const todoCardCheckList = document.createElement("div");
    todoCardCheckList.classList.add("todoCardCheckList");
    todoCardCheckList.textContent = "card CheckList element";
    todoCard.appendChild(todoCardCheckList);
}