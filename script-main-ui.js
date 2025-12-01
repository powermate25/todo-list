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
const todoDiv = document.querySelector(".todo-item")
const taskTitle = document.querySelector(".title")
const taskDescription = document.querySelector(".description")
const taskStatus = document.querySelector(".status .status-value")
const taskPriority = document.querySelector(".priority .priority-value")

const editTaskBtn = document.querySelector(".edit-button")
const deleteTaskBtn = document.querySelector(".delete-button")

displayItem = function(){
    const todoDiv = document.createElement("div")
    todoDiv.className = "todo-item"
    const taskTitle = document.createElement("div")
    taskTitle.className = "title"
    const taskDescription = document.createElement("div")
    taskDescription.className = "description"
    const taskStatus = document.createElement("div")
    taskStatus.className = ("status-value")
 

}

 
