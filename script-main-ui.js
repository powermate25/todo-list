console.log("Working!")

// Date Display
const dateDiv = document.querySelector(".date-now")
const timeDiv = document.querySelector(".time-now")

setInterval(
    () => {
        let timeNow = new Date()
        let currentDate = timeNow.toDateString()  + ", "
        let currentTime = timeNow.getHours() + ":" + timeNow.getMinutes() + ":" + timeNow.getSeconds()
        dateDiv.textContent = currentDate
        timeDiv.textContent = currentTime

   // clog("tick")
    }, 1000)

// Todo items display
const todoListContainer = document.querySelector(".todo-list-container")
const editTaskBtn = document.querySelector(".edit-button")
const deleteTaskBtn = document.querySelector(".delete-button")


/// prepareContainer fn start
DisplayTodoItems = function(){
     // Step1: Loading todoList from storage 
    allTaskFromStorage = JSON.parse( localStorage.getItem("toDoAppFolder2458987545") )
    // Set loop for each item in storage
for(task in allTaskFromStorage){
    // Loop start

    clog(allTaskFromStorage[task])
    currentTask = allTaskFromStorage[task]
    
    // Step2: Defining containers
    const todoItem = document.createElement("div")
    todoItem.className = "todo-item"
    const detailsEle = document.createElement("details")
    detailsEle.setAttribute("open", "")
    const summaryEle = document.createElement("summary")
    summaryEle.className = "title"
    const descriptionDiv = document.createElement("div")
    descriptionDiv.className = "description"
    const overviewDiv = document.createElement("div")
    overviewDiv.className = "overview"
    const statusDiv = document.createElement("div")
    statusDiv.className = "status"
    const statusTitleP = document.createElement("p")
    const statusValueP = document.createElement("p")
    statusValueP.className = "status-value"
    const separatorDiv = document.createElement("div")
    separatorDiv.className = "separator"
    const priorityDiv = document.createElement("div")
    priorityDiv.className = "priority"
    const priorityTitleP = document.createElement("p")
    const priorityValueP = document.createElement("p")
    priorityValueP.className = "priority-value"
    const actionDiv = document.createElement("div")
    actionDiv.className = "action"
    const editTaskBtn = document.createElement("button")
    editTaskBtn.className = "edit-button"
    const deleteTaskBtn = document.createElement("button")
    deleteTaskBtn.className = "delete-button"



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

    // Appending details to corresponding divs
    summaryEle.textContent = tempTitle
    descriptionDiv.textContent = tempDescription
    statusTitleP.textContent = "Status"
    statusValueP.textContent = tempStatus
    priorityTitleP.textContent = "Priority"
    priorityValueP.textContent = tempPriority
    editTaskBtn.textContent = "Edit"
    deleteTaskBtn.textContent = "Delete"

    // Appending children to parent Divs
    todoItem.append(detailsEle)
    detailsEle.append(summaryEle)
    detailsEle.append(descriptionDiv)

    todoItem.append(overviewDiv)
    overviewDiv.append(statusDiv)
    statusDiv.append(statusTitleP)
    statusDiv.append(statusValueP)

    overviewDiv.append(separatorDiv)

    overviewDiv.append(priorityDiv)
    priorityDiv.append(priorityTitleP)
    priorityDiv.append(priorityValueP)

    todoItem.append(actionDiv)
    actionDiv.append(editTaskBtn)
    actionDiv.append(deleteTaskBtn)

    todoListContainer.append(todoItem)

// Loop end
}
}
/// prepareContainer fn end
DisplayTodoItems() 
// const todo1 = new Todo("Awesome Title", "More Details", 2)

//// Daily note Display

const dailyNote = document.querySelector(".todo-note textarea")
const localNote = localStorage.getItem("toDoAppFolder2458987545_dailyNote")
let loadNote = function (){ dailyNote.value = JSON.parse(localNote) }
let saveNote = function (){
    localStorage.setItem( "toDoAppFolder2458987545_dailyNote", ` ${JSON.stringify(dailyNote.value)}` )  
}

dailyNote.addEventListener( "input", () => {saveNote()} ) 

loadNote()


/// Dialog display
/// Button handling module Add task button
