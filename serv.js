module.exports = function (io) {
  var data = {c:{},h:{},t:{}};
    var c = io.of('/chat');//Drawing game
    var users = 0;function die(a){a.emit("count", users);}
    c.on("connection", function (socket) {
      console.log("Someone connected to chat", socket.id);
      users++;
      socket.on("disconnect", function(){console.log(socket.id, "has died");users--;h.emit("count", users);});
      c.emit('player', socket.id);
        data.c[socket.id] = {name: "", score: 0};
        c.emit('players', data.t);
        socket.on('newname', function(a){
          data.c[a[0]].name = a[1];
          c.emit('players', data.c);
        });
        socket.on("disconnect", function(){console.log(socket.id,"has died");users--;h.emit("count", users);
        delete data.c[socket.id];c.emit('players', data.c);
        });
    });
    var h = io.of('/');//Home, duh
    h.on("connection", function(socket){
      console.log("Someone connected to home", socket.id);
      users++;h.emit("count", users);
      socket.on("disconnect", function(){console.log(socket.id, "has died");users--;h.emit("count", users);});
    }); 
    var t = io.of('/text');//Typing Game
    t.on("connection", function (socket) {
        users++;
        console.log("Someone connected to text", socket.id);
        t.emit('player', socket.id);
        data.t[socket.id] = {name: "", score: 0};
        t.emit('players', data.t);
        socket.on('newname', function(a){
          data.t[a[0]].name = a[1];
          t.emit('players', data.t);
        });
        try{socket.on('changescore', function(a){data.t[socket.id].score = a[1];t.emit('players', data.t);});}catch(e){return e;}
        socket.on("disconnect", function(){console.log(socket.id,"has died");users--;h.emit("count", users);
        delete data.t[socket.id];t.emit('players', data.t);
        });
    });
}
