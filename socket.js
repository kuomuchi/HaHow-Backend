const socketCon = (io) => {

    const playerSataus = {}
    const room = [
        {id:1, people:[], },
        {id:2, people:[], },
        {id:3, people:[], },
        {id:4, people:[], },
        {id:5, people:[], }
    ]
    io.on('connection', (socket) => {

        socket.on("room", () => {
            socket.emit("room", room)
        })

        socket.on("joinRoom", (msg) => {

            const data = { // resend user data
                user: msg.id,
                msg: true
            }

            const selectRoom = msg.roomId // room id

            if(room[selectRoom - 1].people.length < 2){ // room is open

                if(!playerSataus[data.user]){

                    // join it
                    socket.emit("joinRoom", data)
                    room[selectRoom - 1].people.push(data.user)
                    socket.emit('room', room)

                    playerSataus[data.user] = selectRoom
                    console.log(playerSataus)

                }else{
                    data.msg = "already join room"
                    socket.emit("joinRoom", data)
                }


            }else{ // room is full
                data.msg = "room is full"
                socket.emit("joinRoom", data)
            }
            
        })

        socket.on("inRoom", (msg) => {
            const roomId = playerSataus[msg.id]

            if(playerSataus[msg.id] > 0){

                socket.join(roomId)
                io.sockets.to(roomId).emit('isRoom', "tset");

            }else{
                socket.emit("noRoom", msg.id)
            }
        })

        // disconnect
        socket.on("disconnect", () => {
            console.log('disssss')
        })
        
    })

}

module.exports = {
    socketCon
}