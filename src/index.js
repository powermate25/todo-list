import "./styles.css";
import { format } from "date-fns";
if (process.env.NODE_ENV !== 'production') { console.log('Looks like we are in development mode!') }

import profilePic from "./images/profile-pic.jpg"
import clockSvg from "./images/icons/clock.svg"
import editSvg from "./images/icons/edit.svg"
import restoreSvg from "./images/icons/restore.svg"
import trashSvg from "./images/icons/trash-can.svg"


import { displayTimeDate } from "./app/module1-dashboard-ui.js"
import { Todo } from "./app/module2-todo.js"
import { formatInputToHashtags } from "./app/module3-dialog-input-check.js"
import { updateTaskColors } from "./app/module4-display-main.js"
import { displayTodoItems } from "./app/module4-display-main.js"
import { saveNote } from "./app/module4-display-main.js"
import { loadNote } from "./app/module4-display-main.js"
import { displayMyProjectItems } from "./app/module5-display-myproject.js"
import { displayTrashItems } from "./app/module6-display-trash.js"
import { displayGroupFolders } from "./app/module7-group-folder-display.js"
import { displayGroupItems } from "./app/module8-display-group-items.js"



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
//const todoGroup = document.querySelectorAll(".task-group option")
const saveNewTaskBtn = document.querySelector("dialog form .save-task-button")
const updateTaskBtn = document.querySelector("dialog form .update-task-button")
const taskListContainer = document.querySelector(".task-list-container")

const taskGroupDataInput = document.querySelector("#group-input")
clog(taskGroupDataInput)

// Fetching current task groups and populating dialog group options



const populateDialogGroupOption = function (){
    
    // Filtering duplicate first
    const currentTaskList = JSON.parse( localStorage.getItem("toDoAppFolder2458987545") )
    let UnfilteredGrpFolder = []
    let filteredGrpFolder = []
    for (let task in currentTaskList ){
        let currentTask = currentTaskList[task]
        if(currentTask && currentTask.isTrashed !== true && currentTask.group){
        clog(currentTask.group)
        
        UnfilteredGrpFolder.push(`${currentTask.group}`)
        }
    }   let UnfilteredGrpToLow = UnfilteredGrpFolder.map(i => i.toLowerCase() )
        filteredGrpFolder = [...new Set(UnfilteredGrpToLow)]
        clog("🔔 Unfiltered groups")
        clog(UnfilteredGrpToLow)
        clog("🔔 Filtered group: ")
        clog(filteredGrpFolder)
    // Done filtering. Now populating dialog group options with filteredGrpFolder
    // const dialogGroupSelectDiv = document.querySelector(".task-group select[name=group]")
    const dialogGroupSelectDiv = document.querySelector(".task-group datalist[id=group-list]") 
    dialogGroupSelectDiv.textContent = ""
    for (let group in filteredGrpFolder ) {
        clog(filteredGrpFolder[group])   
        clog(dialogGroupSelectDiv)
        const NewGrpOption = document.createElement("option")
        NewGrpOption.textContent = `${filteredGrpFolder[group].toUpperCase()}` 
        dialogGroupSelectDiv.append(NewGrpOption)
    }
    UnfilteredGrpFolder = []
}


// Opening dialog
addNewTask.forEach(i =>{
    i.addEventListener("click", () =>{
    // Hiding UPDATE button (Only displaying SAVE button for this "Add" session)
    updateTaskBtn.style.display = "none"
    saveNewTaskBtn.style.display = ""
   // UnfilteredGrpFolder = []
    populateDialogGroupOption()
    addNewTodoDialog.showModal() })
})

// Canceling dialog
cancelDialogBtn.addEventListener("click", () =>{
    addNewTodoDialog.close()
})

// Update display on dialog close event
addNewTodoDialog.addEventListener("close", () => {
   // UnfilteredGrpFolder = []
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

// Getting selected group name

let groupSelected
const getSelectedGroupOld = function (){
    // const todoGroup = document.querySelectorAll(".task-group option")
    todoGroup.forEach(i => {
        clog(" TodoGroup i: ")
        clog(i)
       // clog(i.selected)
        if ( i && i.selected === true){
        clog(i.textContent.toLocaleLowerCase())
        console.log("🔔 Selected group is: " + i.textContent)
        return groupSelected = i.textContent.toLocaleLowerCase()
        }
    })
}

const getSelectedGroup = function (){
    const taskGroupInput = document.querySelector(".task-group input[id=group-input]")
    if (taskGroupInput.value !== ""){
    return groupSelected = taskGroupInput.value}
    else {groupSelected = "My projects"}
}

// clog(getSelectedGroup())

// getting selected due date
/* const dueDateInput_ = document.querySelector("input[type=datetime-local]")
clog(dueDateInput_.value)
dueDateInput_.value = "2025-12-10T11:31" */

let selectedDueDate
// let formattedDueDate
const getSelectedDueDate = function (){
    const dueDateInput = document.querySelector("input[type=datetime-local]")
    !dueDateInput.value ? selectedDueDate = "Untracked"
    : selectedDueDate = dueDateInput.value
    /* if(selectedDueDate !== "Untracked"){
       let formattedDueDate
       formattedDueDate = format(selectedDueDate, "MMM dd yyyy', 'HH':'mm ")
       clog("🔔 Formatted date is: " + formattedDueDate)
    } */
}
/* getSelectedDueDate()
clog(selectedDueDate)
const dueDate = new Date()
clog(format(dueDate, "MMM dd yyyy', 'HH':'mm "))  */

/// Process user dialog inputs

processUserDialogInput = function (){
    
}

// Confirm adding task dialog
saveNewTaskBtn.addEventListener("click", () =>{
    let title = todoTitle.value
    let description = todoDescription.value
    getRadioPriority()
    console.log("📣 " + priorityValue)
    let tags = todoTags.value
    let arrFromTags = tags.split(" ")
    let filteredArrFromTags = arrFromTags.map( i => `${i}` )
    getSelectedGroup()
    console.log("📣 " + groupSelected)
    //formatting first letter to uppercase for all folders
    let groupStr = groupSelected
    let groupStrToWellFormatted = groupStr.charAt(0).toUpperCase() + groupStr.slice(1).toLowerCase()
    getSelectedDueDate()
    console.log("📣 User due date is: " + selectedDueDate)
    new Todo(title, description, priorityValue, groupStrToWellFormatted, selectedDueDate, ...filteredArrFromTags)
    // addNewTodoDialog.close()
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
        // Logic to edit task status (button)
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
        // Logic to edit task priority (button)
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
        
        // Logic to trashed task item (button)
        else if(e.target.className === "delete-button" && currentTaskList[task] && currentTaskList[task].isTrashed !== true && currentTaskList[task].id === e.target.id) {
            clog("🔔 Delete button pressed!")
            clog("🔔 Item matched. Now setting isTrashed: true")
            currentTaskList[task].isTrashed = true
            localStorage.setItem("toDoAppFolder2458987545", JSON.stringify(currentTaskList) )
            displayTodoItems()
            clog(`Task moved to trash!`)
            //${currentTaskList[task].title}
        }
        // Logic to delete task item (permanent) (button)
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
        // Logic to restore task item from trash (button)
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
        // Logic to edit task item via (main dialog)
        else if ( e.target.className === "edit-button" && currentTaskList[task] && currentTaskList[task].id === e.target.id ){
            // Hiding SAVE button (Only displaying UPDATE button for this "Update" session)
            saveNewTaskBtn.style.display = "none"
            updateTaskBtn.style.display = ""
            clog("🔔 Edit button pressed!")
            clog("🔔 Item matched. Now opening editing dialog")
            populateDialogGroupOption()
            addNewTodoDialog.showModal()
            // Reloading field values from current task and auto-filling dialog inputs
            //Also populating dialog group option with current group

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
                    i.setAttribute("checked", "")
                }
            })
            
            
            let groupSelector = document.querySelectorAll(".task-group option")
            let taskGroup
            groupSelector.forEach(i => {
                if(currentTaskList[task].group){taskGroup = currentTaskList[task].group.toLowerCase()}
                else {taskGroup = "none"}
                // clog(i)
                if (i && i.value.toLowerCase() !== taskGroup){ i.removeAttribute("selected") }
                else if (i.value.toLowerCase() === taskGroup){
                    i.setAttribute("selected", "")
                    clog(i)
                }
            })
            
            taskGroupDataInput.value = currentTaskList[task].group
            // Done Reloading field values from current task and auto-filling dialog inputs

            let dueDateInput = document.querySelector("input[type=datetime-local]")
            currentTaskList[task].dueDate !== "Untracked" ?
            dueDateInput.value = currentTaskList[task].dueDate
            : dueDateInput.value = ""

            updateTaskBtn.addEventListener("click", () =>{
                clog("Update Button is clicked!")
                
                currentTaskList[task].title = todoTitle.value
                currentTaskList[task].description = todoDescription.value
                let tags = todoTags.value
                let arrFromTags = tags.split(" ")
                let filteredArrFromTags = arrFromTags.map( i => `${i}` )
                currentTaskList[task].tags = []
                currentTaskList[task].tags.push(...filteredArrFromTags)
                getRadioPriority()
                currentTaskList[task].priority = priorityValue
                getSelectedGroup()
                let groupStr = groupSelected
                let groupStrToWellFormatted = groupStr.charAt(0).toUpperCase() + groupStr.slice(1).toLowerCase()
                currentTaskList[task].group = groupStrToWellFormatted
                
                // Handling due date input conversion to string
                !dueDateInput.value ? currentTaskList[task].dueDate = "Untracked"
                : currentTaskList[task].dueDate = dueDateInput.value

                localStorage.setItem("toDoAppFolder2458987545", JSON.stringify(currentTaskList) )
                addNewTodoDialog.close()
                displayTodoItems()
                // Enabling SAVE button (now hiding UPDATE button)
                saveNewTaskBtn.style.display = ""
                
            })
        }
        // Update status colors on click event before leaving
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
    displayGroupFolders()
    setLeftButtonColor("group-button", "#0066ff")
})

/// Tags button
const tagsButton = document.querySelector("#tags-button") 
tagsButton.addEventListener("click", () => {
    displayTodoItems()
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
    disableBtnInTrash()
    
})

// disabling edits in trash
const disableBtnInTrash = function (){
    let trashButtonSelected = document.querySelector("#trash-button")
    if(trashButtonSelected.style.color !== ""){
        clog("🔔 Ready")
    const btnToDisableInTrash = document.querySelectorAll(".priority-value, .statue-value, .group-value, .due-date-value")
    btnToDisableInTrash.forEach(i => {
        i.addEventListener("click", (e) => {e.preventDefault() })
        displayTrashItems()
        setLeftButtonColor("trash-button", "red") 
        i.disabled = true
        
    })
     }
}



/// Setting button
const settingButton = document.querySelector("#setting-button") 
settingButton.addEventListener("click", () => {
    // displayMyProjectItems()
    setLeftButtonColor("setting-button", "#0066ff")
})

/// Help button
const helpButton = document.querySelector("#help-button") 
helpButton.addEventListener("click", () => {
   // displayMyProjectItems()
    setLeftButtonColor("help-button", "#0066ff") 
})


/// Group folder item button click event

const taskGroupContainer = document.querySelector(".todo-list-container") 
taskGroupContainer.addEventListener("click", (e) => {
    // Checking if trash is not selected
    let trashIndicator = document.querySelector("#trash-button")
    clog(trashIndicator.style.backgroundColor)
    // if (trashIndicator.style.backgroundColor !== ""){alert("🔔 \nCan't edit trashed items! \nPlease restore items first.")}
    if (trashIndicator.style.backgroundColor === ""){  
        const allTaskFromStorage = JSON.parse( localStorage.getItem("toDoAppFolder2458987545") )
        let clickedGroupNameLow = e.target.textContent.toLowerCase()
    for (let task in allTaskFromStorage){
        clog(clickedGroupNameLow) 
        let thisTask = allTaskFromStorage[task]
        if(thisTask && thisTask.group && thisTask.group.toLowerCase() === clickedGroupNameLow ){
        clog( "🔔 Will now filter by group: " + allTaskFromStorage[task].group )
        clog("🔔 Now displaying task filtered by selected group")
        clog(clickedGroupNameLow)
        displayGroupItems(clickedGroupNameLow) }
    } 
    }
})
 
 