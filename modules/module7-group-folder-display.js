import { displayTimeDate } from "./module1-dashboard-ui.js"
import { Todo } from "./module2-todo.js"
import { formatInputToHashtags } from "./module3-dialog-input-check.js"
import { updateTaskColors } from "./module4-display-main.js"
import { displayTodoItems } from "./module4-display-main.js"
import { saveNote } from "./module4-display-main.js"
import { loadNote } from "./module4-display-main.js"
import { displayMyProjectItems } from "./module5-display-myproject.js"
import { displayTrashItems } from "./module6-display-trash.js"
const clog = console.log

/// Preparing container & displaying only group folders. Fn start

const displayGroupFolders = function(){
    const todoListContainer = document.querySelector(".task-list-container")
    const groupContainer = document.createElement("div")
    const editTaskBtn = document.querySelector(".edit-button")
    const deleteTaskBtn = document.querySelector(".delete-button")

    todoListContainer.textContent = ""
    // Step1: Loading todoList from storage 
    const allTaskFromStorage = JSON.parse( localStorage.getItem("toDoAppFolder2458987545") )
    // Set loop for each item in storage
    let taskGroupArray = []
    for(let task in allTaskFromStorage){
        let currentTask = allTaskFromStorage[task]
        if(currentTask && currentTask.isTrashed !== true){
            taskGroupArray.push(`${currentTask.group}`)
            clog("🔔 Unfiltered groups below: ")
            clog(taskGroupArray)
        }
    }
        let UniqueGroupSet = [...new Set(taskGroupArray)]
        clog("🔔 Unified groups below: ")
        clog(UniqueGroupSet)
    for(let group in UniqueGroupSet){
        clog(taskGroupArray[group])
        let uniqueGroupName = UniqueGroupSet[group]
        // Step2: Defining containers
        const taskGroupItem = document.createElement("button")
        taskGroupItem.className = "group-items"
        taskGroupItem.textContent = uniqueGroupName.toUpperCase()
    
    
        groupContainer.className = "group-container"

        groupContainer.append(taskGroupItem)

        todoListContainer.append(groupContainer)
}
updateTaskColors()

}

//displayGroupItems()

/// Preparing container & displaying only group folders. Fn end

/// EXPORTING
export { displayGroupFolders } 

