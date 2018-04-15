var http = require('http');
var url = require('url');

function start(route, handler) {
    console.log('Starting.');

    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        // console.log('Request for path ' + pathname + ' received.');
        // route.route(pathname);
        if (route(pathname, handler)) {
            response.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            response.write('The first Server');
            response.end();
        } else {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            response.write('404 not found');
            response.end();
        }
    }

    var port = process.env.port || 1337;
    http.createServer(onRequest).listen(port);
    console.log('Has been started.');
}

exports.start = start
