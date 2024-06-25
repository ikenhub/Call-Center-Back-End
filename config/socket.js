const socketIo = require('socket.io');
const http = require('http');
const server = http.createServer();
const io = socketIo(server);

server.listen(3000, () => {
    console.log('Socket server running on port 3000');
});

module.exports = io;
