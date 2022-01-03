const socketio = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');
const io = socketio();

const socketApi = {
    io // io: io demektir. es6
};

// libs
const Users = require('./lib/User');
const Rooms = require('./lib/Room');

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

    // Kullanıcı login olduğunda bu data redise kaydolacak.
    Users.upsert(socket.id, socket.request.user); // kullanıcı id ve data'larını verdik

    // Online kullanıcıları listeler.
    Users.list((users) => {
        io.emit('onlineList', users); // kullanıcılara ilettik
    });

    // newRoom emitini karşılar ve odayı redise ekler.
    socket.on('newRoom', (roomName) => {
        Rooms.upsert(roomName);
    });


    // Kullanıcı çıkış yaptığında ilgili kaydı siler. 
    socket.on('disconnect', () => {
        Users.remove(socket.request.user.googleId);
        // Online kullanıcıları listeler.
        Users.list((users) => {
            io.emit('onlineList', users);
        });
    });
});

module.exports = socketApi;