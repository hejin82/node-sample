var http = require('http');
var server = http.createServer();

server.on('request', function(request, response) {
    console.log('request event');
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('hello world\n');
});

server.on('connection', function() {
    console.log('connection event');
});

server.listen(8124, function() {
    console.log('listening event');
});

console.log('server running on port 8142');
