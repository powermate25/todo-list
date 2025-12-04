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

/// Action buttons events start
const editTaskActionButtons = document.querySelectorAll(".edit-button")
const deleteActionButtons = document.querySelectorAll(".delete-button")

taskListContainer.addEventListener("click", (e) => {
    const currentTaskList = JSON.parse( localStorage.getItem("toDoAppFolder2458987545") )
    
    for (let task in currentTaskList){
        // Logic to trashed task item
        if(e.target.className === "delete-button" && currentTaskList[task] && currentTaskList[task].isTrashed !== true && currentTaskList[task].id === e.target.id) {
            clog("🔔 Delete button pressed!")
            clog("🔔 Item matched. Now setting isTrashed: true")
            clog(`Task moved to trash!`)
            currentTaskList[task].isTrashed = true
            localStorage.setItem("toDoAppFolder2458987545", JSON.stringify(currentTaskList) )
            displayTodoItems()
            //${currentTaskList[task].title}
        }
        // Logic to delete task item (permanent)
        else if(e.target.className === "delete-button" && currentTaskList[task] && currentTaskList[task].isTrashed === true &&  currentTaskList[task].id === e.target.id) {
            clog("🔔 Delete button pressed!")
            clog("🔔 Item matched trashed item. Now will permanently delete task")
            delete(currentTaskList[task])
            clog(`Trashed item erased!`)
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
            
            
            //displayTodoItems() 
        }
    }
})

/// Action button events end


/// My projects
const myProjectsBtn = document.querySelector("#my-projects-button")

myProjectsBtn.addEventListener("click", ()=>{
    displayTodoItems()
})




/// Trash button events
const trashButton = document.querySelector("#trash-button")

const deleteTaskBtn = document.querySelectorAll(".delete-button")


trashButton.addEventListener("click", (e)=>{
    displayTrashItems()
    const editTaskBtn = document.querySelectorAll(".edit-button")
    editTaskBtn.forEach(i => {
        i.disabled = true
    }) 

})

