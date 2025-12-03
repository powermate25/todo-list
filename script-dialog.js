console.log("Hello!")

// IIFE START
formatInputToHashtags = (function (){
    const todoTags = document.querySelector("input[id=tags]")
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

