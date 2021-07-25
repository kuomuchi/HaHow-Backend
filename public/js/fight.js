const localStorageData = window.localStorage.getItem("user")

if(localStorageData === null){
    window.location.href = "/"
}

const user = JSON.parse(localStorageData)

let ip = location.href
ip = ip.split('/')
ip = ip[0] + '//' + ip[2]

const socket = io(ip)

socket.emit("inRoom", user)

socket.on("noRoom", (msg) => {
    if(user.id === msg){
        window.location.href = "/room.html"
    }
})

socket.on("isRoom", (msg) => {
    console.log(msg)

})