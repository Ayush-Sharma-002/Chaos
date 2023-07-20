// const server = require('http').createServer();
const io = require('socket.io')(8000)
    // io.set('origins', 'http://*:8000');


// const io = new Server(httpServer, {
//     cors: {
//         origin: 'http://localhost:8000',
//         allowedHeaders: ["my-custom-header"],
//         credentials: true
//     }
// });

// const io = new Server(httpServer, {
//     allowRequest: (req, callback) => {
//         const noOriginHeader = req.headers.origin === undefined;
//         callback(null, noOriginHeader); // only allow requests without 'origin' header
//     }
// });

const users = {};
io.on('connection', socket => {
        // If any new user joins , leet other users connected to the server knows.
        socket.on('new-user-joined', name => {

            users[socket.id] = name;
            socket.broadcast.emit('user-joined', name);

        });

        // If someone sends a message broadcast it to other people

        socket.on('send', message => {
            socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
        });
        // If someone leaves the chat let others know

        socket.on('disconnect', message => {
                socket.broadcast.emit('left', users[socket.id]);
                delete users[socket.id];
            })
            // socket.on('leave', name => {
            //     append(`${name} left the chat`, 'right');
            // });

    })
    // server.listen(5500);