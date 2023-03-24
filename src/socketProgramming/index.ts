const rootSocket = (io) => {
    io.on('connection', (socket) => {
        require('../socketChatEvents')(socket)
        //  socket.on('myEvent', () => {
        //    console.log('myEvent triggered');
        //  });
    });
}
module.exports = rootSocket;
