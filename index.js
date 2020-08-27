var http = require('http');

var config = require('./config.js');
var file_handler = require('./file_handler.js');

if (!config.folder) {
    console.error("Please provide a folder to serve.");
    process.exit(9);
}

var server = http.createServer((request, response) => {
    let url = config.folder + (request.url !== '/' ? request.url : "/index.html");
    console.log(`Getting '${url}'`);
    file_handler.get(url, response);
});

server.listen(config.port);
console.log(`Server listening on port ${config.port}, serving the dir located at '${config.folder}'`);
