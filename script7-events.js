import { displayTimeDate } from "./script1-dashboard-ui.js"
import { Todo } from "./script2-todo.js"
import { formatInputToHashtags } from "./script3-dialog-input-check.js"
import { updateTaskColors } from "./script4-display-main.js"
import { displayTodoItems } from "./script4-display-main.js"
import { saveNote } from "./script4-display-main.js"
import { loadNote } from "./script4-display-main.js"
import { displayMyProjectItems } from "./script5-display-myproject.js"
import { displayTrashItems } from "./script6-display-trash.js"


const clog = console.log
console.log("Yah!")

/// Dialog Events start

const formInsideDialog = document.querySelector(".add-todo-dialog form") 
const addNewTodoDialog = document.querySelector(".add-todo-dialog") 
const addNewTask = document.querySelectorAll(".add-task-button")
const cancelDialogBtn = document.querySelector(".cancel-btn")
const todoTitle = document.querySelector("input[id=title]")
const todoDescription = document.querySelector("textarea[id=description]")
const todoTags = document.querySelector("input[id=tags]")
const todoPriority = document.querySelectorAll("input[name=todo_priority]")
const saveNewTaskBtn = document.querySelector("dialog form .save-task-button")
const updateTaskBtn = document.querySelector("dialog form .update-task-button")
const taskListContainer = document.querySelector(".task-list-container")

// Opening dialog
addNewTask.forEach(i =>{
    i.addEventListener("click", () =>{
    // Hiding UPDATE button (Only displaying SAVE button for this "Add" session)
    updateTaskBtn.style.display = "none"
    saveNewTaskBtn.style.display = ""
    addNewTodoDialog.showModal() })
})

// Canceling dialog
cancelDialogBtn.addEventListener("click", () =>{
    addNewTodoDialog.close()
})

// Update display on dialog close event
addNewTodoDialog.addEventListener("close", () => {
    formInsideDialog.reset()
    displayTodoItems()
    updateTaskColors()
})

// Getting selected radio button value
let priorityValue
const getRadioPriority = function (){
    todoPriority.forEach(i => {
        if(i.checked === true){
            console.log("🔔 Selected radio is: " + i.value)
           return priorityValue = Number(i.value)
        }
    })
}

// Confirm adding task dialog
saveNewTaskBtn.addEventListener("click", () =>{
    let title = todoTitle.value
    let description = todoDescription.value
    getRadioPriority()
    console.log("📣 " + priorityValue)
    let tags = todoTags.value
    let arrFromTags = tags.split(" ")
    filteredArrFromTags = arrFromTags.map( i => `${i}` )
    new Todo(title, description, priorityValue, ...filteredArrFromTags)
    addNewTodoDialog.close()
})

// Confirm Update task dialog
updateTaskBtn.addEventListener("click", () => {
    addNewTodoDialog.close()
})
/// Dialog Events end

/// Action buttons logic start

const editTaskActionButtons = document.querySelectorAll(".edit-button") 
const deleteActionButtons = document.querySelectorAll(".delete-button")
// Event delegation start
taskListContainer.addEventListener("click", (e) => {
    const currentTaskList = JSON.parse( localStorage.getItem("toDoAppFolder2458987545") )
    for (let task in currentTaskList){
        // Logic to edit task status
        if(e.target.className === "status-value" && currentTaskList[task] && currentTaskList[task].isTrashed !== true && currentTaskList[task].id === e.target.id) {
            clog("🔔 Status button pressed!")
            clog("🔔 Item matched. Now dynamically setting statusCompleted")
            clog(`Task status edited!`)
            let currentStatus = currentTaskList[task].statusCompleted 
            currentStatus === true ? currentTaskList[task].statusCompleted = false
            : currentTaskList[task].statusCompleted = true
            localStorage.setItem("toDoAppFolder2458987545", JSON.stringify(currentTaskList) )
            displayTodoItems()
        }
        // Logic to edit task priority
        if(e.target.className === "priority-value" && currentTaskList[task] && currentTaskList[task].isTrashed !== true && currentTaskList[task].id === e.target.id) {
            clog("🔔 Priority button pressed!")
            clog("🔔 Item matched. Now dynamically setting priority value")
            clog(`Task priority edited!`)
            let currentPriority = Number (currentTaskList[task].priority)
            if(currentPriority === 0) {currentTaskList[task].priority = 1}
            else if(currentPriority === 1) {currentTaskList[task].priority = 2}
            else if(currentPriority === 2) {currentTaskList[task].priority = 0}
            localStorage.setItem("toDoAppFolder2458987545", JSON.stringify(currentTaskList) )
            displayTodoItems()
            //${currentTaskList[task].title}
        }
        // Logic to trashed task item
        else if(e.target.className === "delete-button" && currentTaskList[task] && currentTaskList[task].isTrashed !== true && currentTaskList[task].id === e.target.id) {
            clog("🔔 Delete button pressed!")
            clog("🔔 Item matched. Now setting isTrashed: true")
            currentTaskList[task].isTrashed = true
            localStorage.setItem("toDoAppFolder2458987545", JSON.stringify(currentTaskList) )
            displayTodoItems()
            clog(`Task moved to trash!`)
            //${currentTaskList[task].title}
        }
        // Logic to delete task item (permanent)
        else if(e.target.className === "delete-button" && currentTaskList[task] && currentTaskList[task].isTrashed === true &&  currentTaskList[task].id === e.target.id) {
            clog("🔔 Erase button pressed!")
            clog("🔔 Item matched trashed item. Now will permanently delete task")
            delete(currentTaskList[task])
            clog(`Trashed item erased!`)
            clog(currentTaskList)
            localStorage.setItem("toDoAppFolder2458987545", JSON.stringify(currentTaskList) )
            displayTrashItems()
            //${currentTaskList[task].title}
        }
        // Logic to restore task item from trash
        else if(e.target.className === "restore-button" && currentTaskList[task] && currentTaskList[task].isTrashed === true &&  currentTaskList[task].id === e.target.id) {
            clog("🔔 Restore button pressed!")
            clog("🔔 Item matched trashed item. Now will restore task")
            currentTaskList[task].isTrashed = false
            clog(`🔔 Trashed item restored!`)
            clog(currentTaskList)
            localStorage.setItem("toDoAppFolder2458987545", JSON.stringify(currentTaskList) )
            displayTrashItems()
            //${currentTaskList[task].title}
        }
        // Logic to edit task item
        else if ( e.target.className === "edit-button" && currentTaskList[task] && currentTaskList[task].id === e.target.id ){
            // Hiding SAVE button (Only displaying UPDATE button for this "Update" session)
            saveNewTaskBtn.style.display = "none"
            updateTaskBtn.style.display = ""
            clog("🔔 Edit button pressed!")
            clog("🔔 Item matched. Now opening editing dialog")
            addNewTodoDialog.showModal()
            todoTitle.value = currentTaskList[task].title
            todoDescription.value = currentTaskList[task].description
            clog(currentTaskList[task].tags)
            todoTags.value = currentTaskList[task].tags.join(" ")
            let priorityNum = currentTaskList[task].priority
            let inputRadio = document.querySelector(`input[value="${priorityNum}"]`)
            clog(inputRadio.value) 
            todoPriority.forEach(i => {
                if( Number(i.value) !== Number(priorityNum) ){i.removeAttribute("checked")}
                else if (Number(i.value) === Number(priorityNum) ){
                    clog(i)
                    i.setAttribute("checked", "priorityNum")
                }
            })
            updateTaskBtn.addEventListener("click", () =>{
                clog("Update Button is working!")
                currentTaskList[task].title = todoTitle.value
                currentTaskList[task].description = todoDescription.value
                let tags = todoTags.value
                let arrFromTags = tags.split(" ")
                filteredArrFromTags = arrFromTags.map( i => `${i}` )
                currentTaskList[task].tags = []
                currentTaskList[task].tags.push(...filteredArrFromTags)
                getRadioPriority()
                currentTaskList[task].priority = priorityValue
                localStorage.setItem("toDoAppFolder2458987545", JSON.stringify(currentTaskList) )
                addNewTodoDialog.close()
                displayTodoItems()
                // Enabling SAVE button (now hiding UPDATE button)
                saveNewTaskBtn.style.display = ""
                
            })
        }
        // Update status colors on click event
        updateTaskColors()
    }
})
// Event delegation end
/// Action buttons logic end

/// Left panel button color update on click event
const leftPanelButtons = document.querySelectorAll(".left .button")
const setLeftButtonColor = function (thisButtonId, focusColor){
    leftPanelButtons.forEach(i => {
        //clog(i.id)
        if(i.id !== thisButtonId){
            i.style.backgroundColor = ""
            i.style.color = ""
            i.style.fill = ""
        }
        else if(i.id === thisButtonId){
            clog(i.id)
            i.style.backgroundColor = focusColor
            i.style.color = "#ffffff"
            i.style.fill = "#ffffff"
        }
    })
}
//setLeftButtonColor()

/// My projects button
const myProjectsBtn = document.querySelector("#my-projects-button")
myProjectsBtn.addEventListener("click", () => {
    displayMyProjectItems()
    setLeftButtonColor("my-projects-button", "#0066ff")
})

/// All tasks button 
const allTaskBtn = document.querySelector("#all-tasks-button")
allTaskBtn.addEventListener("click", () => {
    displayTodoItems()
    setLeftButtonColor("all-tasks-button", "#0066ff")
})


/// Group button
const groupButton = document.querySelector("#group-button") 
groupButton.addEventListener("click", () => {
    displayMyProjectItems()
    setLeftButtonColor("group-button", "#0066ff")
})

/// Tags button
const tagsButton = document.querySelector("#tags-button") 
tagsButton.addEventListener("click", () => {
    displayMyProjectItems()
    setLeftButtonColor("tags-button", "#0066ff")
})

/// Trash button
// const deleteTaskBtn = document.querySelectorAll(".delete-button")
const trashButton = document.querySelector("#trash-button")
trashButton.addEventListener("click", (e)=>{
    displayTrashItems()
    setLeftButtonColor("trash-button", "red")
    const editTaskBtn = document.querySelectorAll(".edit-button")
    editTaskBtn.forEach(i => {
        i.disabled = true 
        i.style.display = "none"
    })
})


/// Setting button
const settingButton = document.querySelector("#setting-button") 
settingButton.addEventListener("click", () => {
    displayMyProjectItems()
    setLeftButtonColor("setting-button", "#0066ff")
})

/// Help button
const helpButton = document.querySelector("#help-button") 
helpButton.addEventListener("click", () => {
    displayMyProjectItems()
    setLeftButtonColor("help-button", "#0066ff") 
})

