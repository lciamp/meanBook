// get the http and filesystem modules
var http = require('http'),
  fs = require('fs');

// create our server using the http module
http.createServer(function(req, res) {

  // write to our server. set config for the response
  res.writeHead(200, {
    'Content-Type' : 'text/html',
    'Access-Control-Allow-Orogon' : '*'
  });

  // grab the index.html file using fs
  var readStream = fs.createReadStream(__dirname + '/index.html');

  // send the index.html file to our user
  readStream.pipe(res);
	
}).listen(1337);

// tell ourselves whats happening
console.log('visit me at http://localhost:1337');