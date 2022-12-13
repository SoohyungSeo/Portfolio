const socketIO = require('socket.io');

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
        socket.on("enter_room", (roomName) => {            
            socket.join(roomName)
            console.log(socket.rooms)
        })
      });
};