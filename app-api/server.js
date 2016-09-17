// BASE SETUP
// ============================================================================

// CALL THE PACKAGES ----------------------------------------------------------
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser'); // get body-parser
var morgan = require('morgan'); // used to see requests
var mongoose = require('mongoose'); // used to connect with mongoDB
var port = process.env.PORT || 8080; // set the port for our app

// connect to our database
mongoose.connect('mongodb://localhost:27017/mean-dev');

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

// test route to make sure everything is working
// accessed at GET http://localhost:8080/api
apiRouter.get('/', function(req, res){
  res.json({message : 'hooray! welcome to our api!'});
});

// more routes for our api will go here

// REGISTER OUR ROUTES --------------------------------------------------------
// all routes will be prefixed with /api
app.use('/api', apiRouter);

// START THE SERVER
// ============================================================================
app.listen(port);
console.log('magic happens on port ' + port);