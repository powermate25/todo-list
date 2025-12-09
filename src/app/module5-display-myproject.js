import { displayTimeDate } from "./module1-dashboard-ui.js"
import { Todo } from "./module2-todo.js"
import { formatInputToHashtags } from "./module3-dialog-input-check.js"
import { updateTaskColors } from "./module4-display-main.js"
import { displayTodoItems } from "./module4-display-main.js"
import { saveNote } from "./module4-display-main.js"
import { loadNote } from "./module4-display-main.js"

import profilePic from "../images/profile-pic.jpg"
import clockSvg from "../images/icons/clock.svg"
import editSvg from "../images/icons/edit.svg"
import restoreSvg from "../images/icons/restore.svg"
import trashSvg from "../images/icons/trash-can.svg"

const clog = console.log

/// Preparing container & displaying only myproject items. Fn start

const displayMyProjectItems = function(){
    const todoListContainer = document.querySelector(".task-list-container")
    const editTaskBtn = document.querySelector(".edit-button")
    const deleteTaskBtn = document.querySelector(".delete-button")

    todoListContainer.textContent = ""
    // Step1: Loading todoList from storage 
    const allTaskFromStorage = JSON.parse( localStorage.getItem("toDoAppFolder2458987545") )
    // Set loop for each item in storage
for(let task in allTaskFromStorage){
    // Loop start
    let currentTask = allTaskFromStorage[task]

    // Filtering out trashed items before proceeding
    if(currentTask && currentTask.isTrashed !== true && currentTask.group.toLowerCase() === "my projects"){

    // Step2: Defining containers
    const todoItem = document.createElement("div")
    todoItem.className = "todo-item"
    todoItem.id = currentTask.id
    //clog(todoItem)
    const detailsEle = document.createElement("details")
    // detailsEle.setAttribute("open", "")
    const summaryEle = document.createElement("summary")
    summaryEle.className = "title"
    // summaryEle.setAttribute("contenteditable", "true") 
    const descriptionDiv = document.createElement("div")
    // descriptionDiv.setAttribute("contenteditable", "true")
    descriptionDiv.className = "description"
    const overviewDiv = document.createElement("div")
    overviewDiv.className = "overview"
    const statusDiv = document.createElement("div")
    statusDiv.className = "status"
    const statusTitleP = document.createElement("p")
    const statusValueP = document.createElement("p")
    statusValueP.className = "status-value"
    statusValueP.id = currentTask.id
    const separatorDiv = document.createElement("div")
    separatorDiv.className = "separator"
    const priorityDiv = document.createElement("div")
    priorityDiv.className = "priority"
    const priorityTitleP = document.createElement("p")
    const priorityValueP = document.createElement("p")
    priorityValueP.className = "priority-value"
    priorityValueP.id = currentTask.id
    
    const groupDiv = document.createElement("div")
    groupDiv.className = "group"
    const groupTitleP = document.createElement("p")
    const groupValueP = document.createElement("p")
    groupValueP.className = "group-value"
    groupValueP.id = currentTask.id

    const dueDateDiv = document.createElement("div")
    dueDateDiv.className = "due-date"
    const dueDateTitleP = document.createElement("p")
    const dueDateValueP = document.createElement("p")
    dueDateValueP.className = "due-date-value"
    dueDateValueP.id = currentTask.id

    const actionDiv = document.createElement("div")
    actionDiv.className = "action"
    const editTaskBtn = document.createElement("button")
    editTaskBtn.id = currentTask.id
    editTaskBtn.className = "edit-button"
    const deleteTaskBtn = document.createElement("button")
    deleteTaskBtn.id = currentTask.id
    deleteTaskBtn.className = "delete-button"

    // Preparing action buttons icons
    const editIconImg = document.createElement("img")
    editIconImg.setAttribute("src", editSvg)
    editIconImg.className="edit-button"
    editIconImg.id = currentTask.id
    editIconImg.style.width ="1.3rem"
     
    const deleteIconImg = document.createElement("img")
    deleteIconImg.setAttribute("src", trashSvg)
    deleteIconImg.className = "delete-button"
    deleteIconImg.id = currentTask.id
    deleteIconImg.style.width ="1.3rem" 
    
    // Done preparing svg object

    // Initialize task details
    let tempTitle = currentTask.title
    let tempDescription = currentTask.description
    let tempStatus
    if (currentTask.statusCompleted === false) {tempStatus = "Unfinished"}
    else if (currentTask.statusCompleted === true) {tempStatus = "Completed"}
    let tempPriority
    if (currentTask.priority === 0) {tempPriority = "Low"}
    else if (currentTask.priority === 1) {tempPriority = "Normal"}
    else if (currentTask.priority === 2) {tempPriority = "High"}
    let tempGroup = currentTask.group
    let dueDate = currentTask.dueDate

    // Appending details to corresponding divs
    summaryEle.textContent = tempTitle
    descriptionDiv.textContent = tempDescription
    statusTitleP.textContent = "Status"
    statusValueP.textContent = tempStatus
    priorityTitleP.textContent = "Priority"
    priorityValueP.textContent = tempPriority
    groupTitleP.textContent = "📁"
    groupValueP.textContent = tempGroup
    const dateIcon = document.createElement("img")
    dateIcon.setAttribute("src", clockSvg)
    dateIcon.style.width ="1rem"
    // dueDateTitleP.textContent = "⏰"
    dueDateTitleP.append(dateIcon)
    dueDateValueP.textContent = dueDate


    // Appending children to parent Divs
    todoItem.append(detailsEle)
    detailsEle.append(summaryEle)
    detailsEle.append(descriptionDiv)

    todoItem.append(overviewDiv)
    overviewDiv.append(statusDiv)
    statusDiv.append(statusTitleP)
    statusDiv.append(statusValueP)

    // overviewDiv.append(separatorDiv)

    overviewDiv.append(priorityDiv)
    priorityDiv.append(priorityTitleP)
    priorityDiv.append(priorityValueP)

    // overviewDiv.append(separatorDiv)

    overviewDiv.append(groupDiv)
    groupDiv.append(groupTitleP)
    groupDiv.append(groupValueP)

    // overviewDiv.append(separatorDiv)

    overviewDiv.append(dueDateDiv)
    dueDateDiv.append(dueDateTitleP)
    dueDateDiv.append(dueDateValueP)

    todoItem.append(actionDiv)
    actionDiv.append(editTaskBtn)
    actionDiv.append(deleteTaskBtn)

    editTaskBtn.append(editIconImg)
    editTaskBtn.append("Edit")
    deleteTaskBtn.append(deleteIconImg)
    deleteTaskBtn.append("Delete")

    todoListContainer.append(todoItem)
// Loop end
}
}
updateTaskColors()
}

/// Preparing container & displaying only trash items. Fn end

/// EXPORTING
export { displayMyProjectItems }