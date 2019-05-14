var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.send('You made a connection to the server');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('drone_message', function(msg){
        io.emit('drone_message',"Drone: "+ msg);
    });
    socket.on('client_message', function(msg){
        io.emit('client_message', "Client: "+msg);
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port );
});