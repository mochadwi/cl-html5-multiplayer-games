var
  gameport = process.env.PORT || 3000,
  io       = require('socket.io'),
  express  = require('express'),
  UUID     = require('node-uuid'),

  verbose  = true,
  app      = express(),
  server   = require('http').Server(app),
  // server = require('http').createServer(app),
  sio      = io(server);

// tell the game to listen for incoming connections
// app.listen(gameport);
server.listen(gameport);

// log to know if connected successfully
console.log('\t :: Express :: Listening on port ' + gameport);
// By default, redirect to this pages
app.get('/', function(req, res)
{
  res.sendFile(__dirname + '/games.html');
}); // app.get '/'

// routing, will listen for request on /*
app.get('/*', function(req, res, next)
{
  // current file being requested
  // var file = req.params[0];
  var file = '';

  // debugging purpose
  if (verbose) console.log('\t :: Express :: File requested : ' + file);

  // send the requesting client the file.
  res.sendFile(__dirname + '/' + file);
}); // app.get '/*'

// Configure the socket.io connection settings.
// sio.configure(function()
// {
//   sio.set('log level', 0);

//   sio.set('authorization', function(handShake, callBack)
//   {
//     callBack(null, true); // error
//   });
// });

// Socket.io call this function when client connects,
// We can send that client a unique ID
// so we can maintain the list of players
sio.sockets.on('connection', function(client)
{
  // Generates new UUID
  // and store this on client's socket / connection
  client.userid = UUID;

  // Tell the player they connected, and giving them their id
  client.emit('onconnected', {id: client.userid});

  // log when clients disconnects
  console.log('\t socket.io :: Player ' + client.userid + ' connected!');

  // When client disconnects
  client.on('disconnect', function()
  {
    // log when clients disconnects
    console.log('\t socket.io :: Player ' + client.userid + ' disconnected!');
  }); // client.on disconnect
}); // sio.sockets.on connection