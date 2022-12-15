const socketIO = require('socket.io');
const Room = require("../schema/room")


module.exports = (server) => {
    const io = socketIO(server, {
        cors: {
          origin: "*",
        },
      });

      io.on("connection", (socket) => {
        socket.onAny((event) => {
            console.log(`${event}`)
        })

        socket.on("join Lobby", (data, nickname)=>{
          socket.join(data.room);
          io.to(data.room).emit("welcome Message", nickname);
        })

        socket.on("exit Lobby", (data) => {
          console.log(data.room)
          socket.leave(data.room)
          console.log("로비에서 나감")
          console.log(data.room)
          io.to(socket.id).emit("alert leave lobby", data.room)
        })

        socket.on("enter_room", async(roomName, nickname) => {            
            const findRoom = await Room.findOne({room:roomName})
            if(!findRoom){
              await Room.create({room:roomName})
              await Room.updateOne({room:roomName}, {$push:{nickname:nickname}})
            }
        })
      });
}