// server.js
// BASE SETUP
// ============================================================================

// CALL THE PACKAGES ----------------------------------------------------------
var express = require('express'), // call express
    app = express(), // define our app using express
    bodyParser = require('body-parser'), // get body-parser
    morgan = require('morgan'), // used to see requests
    mongoose = require('mongoose'), // used to connect with mongoDB
    port = process.env.PORT || 8080, // set the port for our app
    User = require('./app-api/models/user'); // import user model

// set some local variables
app.locals.title = "Lou's app";
app.locals.email = "lou@lou.com";

// connect to our database & check for connection error
mongoose.connect('mongodb://localhost:27017/mean-dev', function(err){
  if(err) throw err;
});

// APP CONFIGURATION ----------------------------------------------------------
// use body-parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
// allows any domain to access our API
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Orgin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,\
    Authorization');
  next();
});

// log all requests to the console
app.use(morgan('dev'));

// ROUTES FOR OUR API
//=============================================================================

// basic route for the home page
app.get('/', function(req, res){
  res.send('Welcome to our home page');
});

// get an instance of the express router
var apiRouter = express.Router();

// middelware for all requests
apiRouter.use(function(req, res, next){
  // do logging
  console.log('Somone just came to our app!');

  next();
});

// test route to make sure everything is working
// accessed at GET http://localhost:8080/api
apiRouter.get('/', function(req, res){
  res.json({message : 'hooray! welcome to our api!'});
});



// more routes for our api will go here

// REGISTER OUR ROUTES --------------------------------------------------------
// all routes that will be prefixed with /api
app.use('/api', apiRouter);

// START THE SERVER
// ============================================================================
app.listen(port);
console.log('magic happens on port ' + port);