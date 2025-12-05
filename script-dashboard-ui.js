console.log("Working!")

/// Date Display logic start

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

/// Date Display logic end