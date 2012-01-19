
/**
 * Module dependencies.
 */

var express     = require('express'),
    mongoose    = require('mongoose'),
    brain       = require('brain'),
    url         = require('url'),
    redis       = require('redis'),
    everyauth   = require("everyauth"),
    RedisStore  = require('./lib/connect-redis/index.js')(express);

var app         = express.createServer();


// Attach custom Config and DB properties
app.configure( function() {
  app.config  = require("./lib/config");
  app.db      = require("./lib/dbconfig");
})


// Configure Everyauth
require("./lib/everyauthConfig")(app, everyauth);


// Configure Express 
app.configure( function() {

  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ 
    secret: "testler20120119secret", 
    store: !app.config.localRedis ? new RedisStore(app.config.redis) : {} 
  }));
  app.use(everyauth.middleware());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

everyauth.helpExpress(app);

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


// Configure Routes
var routes = require('./routes')(app);


// Run app
app.listen(app.config.port);
console.log("Express server listening on port %d in %s mode", app.config.port, app.settings.env);
