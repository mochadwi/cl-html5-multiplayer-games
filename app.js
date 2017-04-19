var
  gameport = process.env.PORT || 3000,
  io       = require('socket.io'),
  express  = require('express'),
  UUID     = require('node-uuid'),

  verbose  = true,
  app      = express();

// tell the game to listen for incoming connections
app.listen(gameport);
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