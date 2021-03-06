// load express package and creat our app
var express = require('express'),
  app = express(),
  path = require('path');

// send our index.html file to the user for the home page
// send our index.html file to the user for the home page
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

// create routes for admin section

// get an instance of the router
var adminRouter = express.Router();
// route middlewear that will happen on every request
adminRouter.use(function(req, res, next){

  //log each request to the console
  console.log(req.method, req.url);

  // continue doing what we were doing and go to the route
  next();
});

// admin main page. the dashboard 1337/admin
adminRouter.get('/', function(req, res){
  res.send('I am the dashboard');
});

// route middlewear to validate :name
adminRouter.param('name', function(req, res, next, name){
  // do validation here
  // validation
  // log something so we know its working
  console.log('doing name validation on ' + name);

  // once validation is done save the new iten in the req
  req.name = name;

  // go to the next thing
  next();

});

// user page 1337/admin/users  *** WITH PARAMATERS
adminRouter.get('/users/:name', function(req, res){
  res.send('hello ' + req.name + '!');
});
  
// post page 1337/admin/posts
adminRouter.get('/posts', function(req, res){
  res.send('I show all the posts');
});

// add router to the app
app.use('/admin', adminRouter);

// start the server
app.listen(1337);
console.log('1337 is the magic port');