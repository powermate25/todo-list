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
    DisplayTodoItems()
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
const editTaskButtons = document.querySelectorAll(".edit-button") 
clog(editTaskButtons)

// Live task editing using "contenteditable" attribute
editTaskButtons.forEach(i => {
    i.addEventListener("click", (e) => {
        let tempTitle = document.querySelector(`#${i.id} .title`)
        let tempDescription = document.querySelector(`#${i.id} .description`)
        
        clog(tempTitle)
        tempTitle.setAttribute("contenteditable", "true")
        tempDescription.setAttribute("contenteditable", "true")
        tempTitle.focus()
        clog(i.id)
    })
})

const deleteActionButtons = document.querySelectorAll(".delete-button")
deleteActionButtons.forEach(i => {
    i.addEventListener("click", (e) => {
        clog(i.id) 
    })
})

/// Action button events end

console.log()