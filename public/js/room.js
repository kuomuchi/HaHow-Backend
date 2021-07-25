const localStorageData = window.localStorage.getItem("user")

if(localStorageData === null){
    window.location.href = "/"
}

const user = JSON.parse(localStorageData)


let ip = location.href
ip = ip.split('/')
ip = ip[0] + '//' + ip[2]

const socket = io(ip)

socket.emit('room')

let selectRoom = -1

socket.on("room", (msg) => {
    const room = document.getElementById("room_list")
    room.innerHTML = ''

    console.log(msg)

    for(let num = 0; num < msg.length; num++){
        const newChild = document.createElement("div")
        newChild.classList.add("room")

        newChild.textContent = "  房間id: " + msg[num].id + " - - - - " + "人數:" + msg[num].people.length + " / 2"

        newChild.addEventListener("click", () => {
            selectRoom = msg[num].id
        })
        room.appendChild(newChild)
    }

})

socket.on("joinRoom", (msg) => {
    console.log(msg)
    if(msg.user === user.id){

        if(msg.msg === true){ // join room
            
            window.location.href = "/fight.html"

        }else{
            alert(msg.msg)
        }

    }
})

document.getElementById("button").addEventListener("click", () => {
    if(selectRoom > 0){

        const data = {
            id: user.id,
            roomId: selectRoom
        }

        socket.emit('joinRoom', data)


    }else{
        alert("please choose a room")
    }
        
    
})



socket.on("test", (msg) => {
    console.log(msg)
})