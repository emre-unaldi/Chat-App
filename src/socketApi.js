const socketio = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');
const io = socketio();

const socketApi = {
    io // io: io demektir. es6
};

/*
  Socket Authorization
    socketio da bir middleware yazmak için io.use() dememiz yeterli.
    - Her socket bağlantısı çalıtırılma / kullanılmak istendiğinde arada bu middleware 
    olacak ve her ilem bu ara katmandan geçtikten sonra sonuca ulaşacak.
*/
io.use(socketAuthorization);

// Redis Adapter
const redisAdapter = require("socket.io-redis");
io.adapter(redisAdapter({ 
    host: process.env.REDIS_URI, 
    port: process.env.REDIS_PORT
}));

io.on('connection', (socket) => {
    console.log('a user logged in with name ' + socket.request.user.name);

    socket.broadcast.emit('hello');
});

module.exports = socketApi;