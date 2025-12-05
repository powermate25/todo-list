console.log("Welcome!")
const clog = console.log
class Todo {
    constructor(title, description, priority, ...tags){
        this.title = title
        this.description = description
        this.group = "My Projects"
        this.priority = priority
        this.color = "default"
        this.tags = [...tags]
        this.note = ""
        this.creationDate = new Date()
        this.dueDate = ""
        this.statusCompleted = false
        this.isTrashed = false
        //this.id = "Unique-ToDo-ID_" + crypto.randomUUID()
        this.id = "Unique-ToDo-ID_" + Math.random() * 12345
         
        // Both comments above works but act as single file structure
        // which is not practical for iterating through multiples todo items)
        // I didn't want to iterate through the whole localStorage with all the unrelated
        // data to my todo app it might contain just to retrieve todo items.

        // Eventually I'm then forced to figure out a way to simulate folder like browsing logic
        // to be able to store multiple todo items in one local storage (folder) item.
        // This being said, I decided to name my app folder toDoAppFolder2458987545.
        // From here, all codes below are based on the folder structure simulation logic.
        // How it works: I'm storing multiple objects in a single array each time.
        // The whole logic is essentially based on a Get(array), Update(array) & Post(array) logic 
        // Here we go!
        let tempArr = []
        tempArr.push(this)
        // clog(TempArr)

        this.initializeStorage = ( () => {
            clog("🏭 IIFE (constructor) auto running")
    if ( localStorage.getItem("toDoAppFolder2458987545") === null ) {
        clog("🏁🏁 Empty folder. Will now proceed to creating data ")
        let stringifiedTempArr = JSON.stringify(tempArr)
        localStorage.setItem("toDoAppFolder2458987545", stringifiedTempArr) }

    else if ( localStorage.getItem("toDoAppFolder2458987545") !== null ) {
        clog("🚨🚨 Folder already exist see it's details from localstorage below: ")
        clog( localStorage.getItem("toDoAppFolder2458987545") )
        let CurrentArrFromStorage = localStorage.getItem("toDoAppFolder2458987545")
        let ParsedArrFromStorage = JSON.parse(CurrentArrFromStorage)
        clog("⛽ Now parsing stored data and returning array. See array info below: ")
        clog(ParsedArrFromStorage)
        let MergedOldWithNewData = ParsedArrFromStorage.concat(tempArr)
        clog("⛽ Now merging old local data with New data and displaying merged array below: ")
        clog(MergedOldWithNewData)
        let stringifiedNewlyMergedData = JSON.stringify(MergedOldWithNewData)
        localStorage.setItem("toDoAppFolder2458987545", stringifiedNewlyMergedData)
    }
    
    clog("🏭 IIFE (constructor) done running")
    } )()        
}   

        /// GET - Getting item from storage method
    getArrFromLocal(){
        clog("📥 getArrFromLocal() now running")
        let arrFromLocal
        let appFolderFromLocal = localStorage.getItem("toDoAppFolder2458987545")
        if ( appFolderFromLocal !== null ){
            clog("🔔 getArrFromLocal() says: Folder already exist: see it's details below")
            clog(appFolderFromLocal)
            arrFromLocal = JSON.parse(appFolderFromLocal)
            return arrFromLocal }
        else if (appFolderFromLocal === null){
            clog("🔔 getArrFromLocal() says: First time run: Initializing empty array now.")
            arrFromLocal = []
            return arrFromLocal
        }
        clog("📥 getArrFromLocal() done running")
    }
        /// PREPARE TO UPDATE (method) - Setting/indexing item to be edited 
        /// by retrieving stored appdata from localStorage (via getArrFromLocal method)
    setThisFromLocal(){
        clog("🎯 setThisFromLocal() now running " )
        let arrFromLocal = this.getArrFromLocal()
        clog("🚨 setThisFromLocal() says: here's this.getArrFromLocal() returnValue below")
        clog(arrFromLocal)
        arrFromLocal
        // Declaring temporary _this_ item to hold user changes
        let _this_
        for ( let item in arrFromLocal ){
            clog("🔄 For loop found items & related Ids are: ")
            clog(item)
            clog(arrFromLocal[item].id)
        // Checking for a match before continuing
            if( arrFromLocal[item].id === this.id ) { _this_ = arrFromLocal[item] }
        }
        clog("🚨 setThisFromLocal() says: if ids matched, _this_ should be revealed right below: ")
        clog(_this_)
        clog("🎯 setThisFromLocal() done running " )
        return _this_
    }

        /// UPDATE & POST (method) - Setting edited _this_ back to stored array.
        /// (Value to be set comes from setThisFromLocal method)
        /// which is gotten from getArrFromLocal method. 
    add_This_ToArrFromLocal(editedTHIS){
        clog("📤 add_This_ToArrFromLocal() now running ")
        clog("🔔🔔 Edited THIS details below: ")
        clog(editedTHIS) 
        // Setting a _temp item to hold retrieved data
        // then checking ids for matched object (using loop) before updating
        // Update consisting of replacing old data with new data at the exact array index.
        // This helps with keeping correct data structure
        let _temp = this.getArrFromLocal() 
        for ( let item in _temp ){ 
        clog("🔄🔄🔄 add_This.. loop started")
        clog( _temp[item]  )
        clog("🔄🔄🔄 add_this.. loop done")
            if (_temp[item].id === editedTHIS.id ){
                clog("📣 Found match!")
                clog("📣 index of matched item is below: ")
                clog( _temp.indexOf( _temp[item] )  ) 
                let index = _temp.indexOf( _temp[item] )
                clog(_temp.at(index))
                clog(_temp[index])
                _temp[index] = editedTHIS
                _temp
                clog("🔔 Here's _temp after matching id and update below: ")
                clog(_temp) }
           // else {clog("📣 No match, but it's really weird. Logically it should always match at this point.")}
        }
        // Merging and replacing array in localStorage with updated array
        let merged_this_ToArrFromLocal = _temp
        let stringifiedArrForLocal = JSON.stringify(merged_this_ToArrFromLocal)
        localStorage.setItem("toDoAppFolder2458987545", stringifiedArrForLocal ) 
        clog("📤 add_This_ToArrFromLocal() done running")

    }

    delete_This_FromArrFromLocal(editedTHIS){
        clog("📤 delete_This_FromArrFromLocal() now running ")
        clog("🔔🔔 Edited THIS details below: ")
        clog(editedTHIS) 
        let _temp = this.getArrFromLocal() 
        for ( let item in _temp ){ 
        clog("🔄🔄🔄 delete_This_.. loop started checking")
        clog( _temp[item]  )
        clog("🔄🔄🔄 delete_This_.. loop done checking")
            if (_temp[item].id === editedTHIS.id ){
                clog("📣 Found match!")
                clog("📣 index of matched item is below: ")
                clog( _temp.indexOf( _temp[item] )  ) 
                let index = _temp.indexOf( _temp[item] )
                clog(_temp.at(index))
                clog(_temp[index])
                delete (_temp[index])
                _temp
                clog("🔔 Ids matched and item is now deleted! Here's _temp after deletion below: ")
                clog(_temp)
            }
        }
        // Merging and replacing array in localStorage with updated array
        let merged_this_ToArrFromLocal = _temp
        let stringifiedArrForLocal = JSON.stringify(merged_this_ToArrFromLocal)
        localStorage.setItem("toDoAppFolder2458987545", stringifiedArrForLocal ) 
        clog("📤 delete_This_FromArrFromLocal() done running")

    }

    deleteItem(){
        clog("📄 deleteItem() now running")
        // this.title = newTitle

        let arrFromLocal = this.getArrFromLocal()
        let _this_ = this.setThisFromLocal()
        if(arrFromLocal && _this_){ 
            clog("👇 Check _This_ value below :")
            clog(_this_)
            clog("❌ Item to be deleted returned below: ")
            clog(this)
            this.delete_This_FromArrFromLocal(this)
        }
        clog("📄 deleteItem() done running")
    }
    
    setTitle(newTitle){
        clog("📄 setTitle() now running")
        this.title = newTitle

        let arrFromLocal = this.getArrFromLocal()
        let _this_ = this.setThisFromLocal()
        if(arrFromLocal && _this_){ 
            clog("👇 Check _This_ value below :")
            clog(_this_)
            _this_.title = newTitle
            this.title = _this_.title
            clog("🎨 Editing title done. THIS is returned below: ")
            clog(this)
            this.add_This_ToArrFromLocal(this)
        }
        clog("📄 setTitle() done running")
    }

    setDescription(newDescription){
        clog("📄 setDescription() now running ")
        let arrFromLocal = this.getArrFromLocal()
        let _this_ = this.setThisFromLocal()
        if(arrFromLocal && _this_){ 
            clog("👇 Check _This_ value below :")
            clog(_this_)
            _this_.description = newDescription
            this.description = _this_.description
            clog("🎨 Edit description done. THIS is returned below: ")
            clog(this)
            this.add_This_ToArrFromLocal(this)
        }
        clog("📄 setDescription() done running")
         
    }

    setGroup(newGroupName){
        clog("📄 setGroup() now running")
        this.group = newGroupName

        let arrFromLocal = this.getArrFromLocal()
        let _this_ = this.setThisFromLocal()
        if(arrFromLocal && _this_){ 
            clog("👇 Check _This_ value below :")
            clog(_this_)
            _this_.group = newGroupName
            this.group = _this_.group
            clog("🎨 Editing title done. THIS is returned below: ")
            clog(this)
            this.add_This_ToArrFromLocal(this)
        }
        clog("📄 setGroup() done running")
    }

    setColor(newColorCode){
        clog("📄 setColor() now running")
        this.color = newColorCode

        let arrFromLocal = this.getArrFromLocal()
        let _this_ = this.setThisFromLocal()
        if(arrFromLocal && _this_){ 
            clog("👇 Check _This_ value below :")
            clog(_this_)
            _this_.color = newColorCode
            this.color = _this_.color
            clog("🎨 Editing title done. THIS is returned below: ")
            clog(this)
            this.add_This_ToArrFromLocal(this)
        }
        clog("📄 setColor() done running")
    }

    setPriority(levelNumber){
        clog("📄 setPriority() now running")
        if (levelNumber === 0){
            this.priority = "Low"
            let arrFromLocal = this.getArrFromLocal()
        let _this_ = this.setThisFromLocal()
            if(arrFromLocal && _this_){ 
                clog("👇 Check _This_ value below :")
                clog(_this_)
                _this_.priority = "Low"
                this.priority = _this_.priority
                clog("🎨 Editing Priority done. THIS is returned below: ")
                clog(this)
                this.add_This_ToArrFromLocal(this)
            }
        }
        else if (levelNumber === 1){
            this.priority = "Normal"
            let arrFromLocal = this.getArrFromLocal()
        let _this_ = this.setThisFromLocal()
            if(arrFromLocal && _this_){ 
                clog("👇 Check _This_ value below :")
                clog(_this_)
                _this_.priority = "Normal"
                this.priority = _this_.priority
                clog("🎨 Editing Priority done. THIS is returned below: ")
                clog(this)
                this.add_This_ToArrFromLocal(this)
            }
        }
        else if (levelNumber === 2){
            this.priority = "High"
            let arrFromLocal = this.getArrFromLocal()
        let _this_ = this.setThisFromLocal()
            if(arrFromLocal && _this_){ 
                clog("👇 Check _This_ value below :")
                clog(_this_)
                _this_.priority = "High"
                this.priority = _this_.priority
                clog("🎨 Editing Priority done. THIS is returned below: ")
                clog(this)
                this.add_This_ToArrFromLocal(this)
            }
        }
        clog("📄 setPriority() done running")
    }

    setStatusCompleted(boolean){
        this.statusCompleted = boolean

        clog("📄 setStatusCompleted() now running")
        this.statusCompleted = boolean

        let arrFromLocal = this.getArrFromLocal()
        let _this_ = this.setThisFromLocal()
        if(arrFromLocal && _this_){ 
            clog("👇 Check _This_ value below :")
            clog(_this_)
            _this_.statusCompleted = boolean
            this.statusCompleted = _this_.statusCompleted
            clog("🎨 Editing title done. THIS is returned below: ")
            clog(this)
            this.add_This_ToArrFromLocal(this)
        }
        clog("📄 setStatusCompleted() done running")
    }


    setTags(...tagList){
        clog("📄 setTags() now running")
        let _tempTags = [...tagList]
        for(let tag in _tempTags){
            if(_tempTags[tag].length <=2){
                clog(`🚨 Tag name is too short! Min 3 characters. Wrong tag name: ${_tempTags[tag]}`)
                return } else {
                let newTagList = this.tags.concat(_tempTags)
                // this.tags = newTagList
                
                let arrFromLocal = this.getArrFromLocal()
                let _this_ = this.setThisFromLocal()
            if(arrFromLocal && _this_){ 
                clog("👇 Check _This_ value below :")
                clog(_this_)
                _this_.tags = newTagList
                this.tags = _this_.tags
                clog("🎨 Editing tags done. THIS is returned below: ")
                clog(this)
                this.add_This_ToArrFromLocal(this)
        }
        clog("📄 setTags() done running")
        return  _tempTags = []
                
                }   
        }

        
    }

    setDueDate(newDueDate){
        this.dueDate = newDueDate
    }

    moveToTrash(booleanValue){
        
        clog("♻ moveToTrash() now running")
        this.isTrashed = booleanValue
        let arrFromLocal = this.getArrFromLocal()
        let _this_ = this.setThisFromLocal()
        if(arrFromLocal && _this_){ 
            clog("👇 Check _This_ value below :")
            clog(_this_)
            _this_.isTrashed = booleanValue
            this.isTrashed = _this_.isTrashed
            clog("🎨 Trash setting done. THIS is returned below: ")
            clog(this)
            this.add_This_ToArrFromLocal(this)
        }
        clog("♻ moveToTrash() done running")
    }

} 

/* const todo1 = new Todo("Project X")
todo1.setDescription("Stay consistent learning TOP") 
const todo2 = new Todo("Another Pj", "Stay consistent learning TOP")
const todo3 = new Todo("Good Pj", "Stay consistent learning TOP")

todo1.setTags("tag1", "tag2", "tag3") */
// todo2.setTags("tag4", "tag5")
/* clog(new Todo("No Title?") ) */