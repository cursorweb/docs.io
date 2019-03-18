var app = require('express')(),
server = require('http').Server(app),
io = require('socket.io')(server),
a = require("fs").realpathSync(".");
require(a + '/serv.js')(io);
app.use('/', require('express').static(a + '/public'));
app.get("/", function(req, res) {
  res.sendFile(a + "/h.html");
});
app.get('/:a', function(req, res) {
  res.status(404).send(`<link href = "game.css" rel = "stylesheet" type = "text/css"/><h1 class = 'title'>404 Error</h1><p class = 'font rip'><span class = 'widcont'>We are sorry, but we cannot find the game, ${req.params.a}.<br>Seems like it does not exist. <br>Return to <a href = "/">homepage</a>?</span></p>`);
});
server.listen(8080);
