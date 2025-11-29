console.log("Hello!")
const addNewTodoDialog = document.querySelector(".add-todo-dialog")
const addNewTodoBtn = document.querySelector(".add-todo-button")
const cancelDialogBtn = document.querySelector(".cancel-button")
const todoTitle = document.querySelector("input[id=title]")
const todoDescription = document.querySelector("textarea[id=description]")
const todoTags = document.querySelector("input[id=tags]")
const todoPriority = document.querySelectorAll("input[name=todo_priority]")
const saveNewTodoBtn = document.querySelector("dialog form .save-todo-button")

let displayTodoList = function(){
    const todoList = JSON.parse( localStorage.getItem("toDoAppFolder2458987545") )
for (todo in todoList){
    const newDiv = document.createElement("div")
    newDiv.append(todoList[todo].title)
    newDiv.append(todoList[todo].description)
    newDiv.append(todoList[todo].tags)
    newDiv.append(todoList[todo].creationDate)
    newDiv.append(todoList[todo].group)
    newDiv.append(todoList[todo].color)
    document.body.appendChild(newDiv) 
} 
}


// IIFE START
formatInputToHashtags = (function (){
    todoTags.addEventListener("input", (e) =>{

    if(e.inputType !== "deleteContentBackward"){
        let formatInput = todoTags.value.split(" ")
        console.log(formatInput)
        let tempArr = []
        let checkFormatInputError = formatInput.map(i => {
        if(i.charAt(0) !== "#"){
            console.log( "🔔 Error found in tags. Auto-correcting now!" )
            i = "#" + i
            console.log("🔔 Auto-corrected: " + i) 
            //tempIndex = formatInput.indexOf(i)
           // todoTags.value[tempIndex] = "#" + i   
        }
        tempArr.push(i)
        todoTags.value = tempArr.join(" ")
    })

        let InputFirstIndex = todoTags.value.charAt(0)
        if (InputFirstIndex !== "#"){
            InputFirstIndex = "#"
            todoTags.value = InputFirstIndex + todoTags.value 
        }
        else { todoTags.value = todoTags.value }

        let InputLastIndex = todoTags.value.slice(-1)
        if (InputLastIndex === " "){
            InputLastIndex = "#"
            todoTags.value = todoTags.value + InputLastIndex
            let splitInput = todoTags.value.split(" ")
            }
        else if (InputLastIndex === ","){
            InputLastIndex = " #"
            todoTags.value = todoTags.value + InputLastIndex
            let splitInput = todoTags.value.split(" ")
            }

        
    }
})

})()
//IIFE END

// Opening dialog
addNewTodoBtn.addEventListener("click", () =>{
    addNewTodoDialog.showModal()
})

// Canceling dialog
cancelDialogBtn.addEventListener("click", () =>{
    addNewTodoDialog.close()
})

// Update display on dialog close event
addNewTodoDialog.addEventListener("close", () => {
    displayTodoList()
})

// Getting selected radio button value
let priorityValue
getRadioPriority = function (){
    todoPriority.forEach(i => {
        if(i.checked === true){
            console.log("🔔 Selected radio is: " + i.value)
           return priorityValue = i.value
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

