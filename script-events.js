console.log("Yah!")

/// Dialog Events start
const addNewTodoDialog = document.querySelector(".add-todo-dialog") 
const addNewTask = document.querySelectorAll(".add-task-button")
const cancelDialogBtn = document.querySelector(".cancel-btn")
const todoTitle = document.querySelector("input[id=title]")
const todoDescription = document.querySelector("textarea[id=description]")
const todoTags = document.querySelector("input[id=tags]")
const todoPriority = document.querySelectorAll("input[name=todo_priority]")
const saveNewTodoBtn = document.querySelector("dialog form .save-todo-button")
const taskListContainer = document.querySelector(".task-list-container")

// Opening dialog
addNewTask.forEach(i =>{
    i.addEventListener("click", () =>{
    addNewTodoDialog.showModal() })
})

// Canceling dialog
cancelDialogBtn.addEventListener("click", () =>{
    addNewTodoDialog.close()
})

// Update display on dialog close event
addNewTodoDialog.addEventListener("close", () => {
    displayTodoItems()
})

// Getting selected radio button value
let priorityValue
getRadioPriority = function (){
    todoPriority.forEach(i => {
        if(i.checked === true){
            console.log("🔔 Selected radio is: " + i.value)
           return priorityValue = Number(i.value)
        }
    })
}

// Confirming add todo list dialog
saveNewTodoBtn.addEventListener("click", () =>{
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

/// Dialog Events end

/// Action buttons events start
const editTaskActionButtons = document.querySelectorAll(".edit-button")
const deleteActionButtons = document.querySelectorAll(".delete-button")
// clog(editTaskButtons)

// Live task editing
/* editTaskActionButtons.forEach(i => {
    i.addEventListener("click", (e) => {
        let tempTitle = document.querySelector(`#${i.id} .title`)
        let tempDescription = document.querySelector(`#${i.id} .description`)
        
        clog(tempTitle)
        tempTitle.setAttribute("contenteditable", "true")
        tempDescription.setAttribute("contenteditable", "true")
        tempTitle.click()
        tempTitle.focus()
        
        clog(i.id) 
    })  
}) */



taskListContainer.addEventListener("click", (e) => {
    
    //clog(i.id)
    const currentTaskList = JSON.parse( localStorage.getItem("toDoAppFolder2458987545") )
    for (let task in currentTaskList){
        // Logic to delete task item
        if(e.target.className === "delete-button" && currentTaskList[task].id === e.target.id) {
            clog("🔔 Delete button pressed!")
            clog("🔔 Item matched. Now setting isTrashed: true")
            clog(`Task moved to trash!`)
            currentTaskList[task].isTrashed = true
            localStorage.setItem("toDoAppFolder2458987545", JSON.stringify(currentTaskList) )
            displayTodoItems()
            //${currentTaskList[task].title}
        }
        // Logic to edit task item
        if ( e.target.className === "edit-button" && currentTaskList[task].id === e.target.id ){
            clog("🔔 Edit button pressed!")
            clog("🔔 Item matched. Now opening editing dialog")
            addNewTodoDialog.showModal()
            todoTitle.value = currentTaskList[task].title
            todoDescription.value = currentTaskList[task].description
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
            localStorage.setItem("toDoAppFolder2458987545", JSON.stringify(currentTaskList) )
            
            //displayTodoItems() 
        }
    }
})



/// Action button events end

