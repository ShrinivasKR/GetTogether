var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*'
    });
    response.end('Hello World from Node.js\n');
}).listen(8000);

console.log("Node.js server is running on http://localhost:8000");