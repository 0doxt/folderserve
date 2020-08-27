var fs = require('fs');

var file_types = require('./file_types.js');

let get_content_type = file_name => {
    let split = file_name.split('.');
    let extension = split[split.length - 1];
    let content_type = file_types[extension];

    if (content_type) return content_type;
    else return file_types['.DEFAULT'];
}

module.exports = {
    get: (file_name, response) => {
        fs.readFile(file_name, 'utf8', (err, data) => {
            if (!err) {
                response.writeHead(
                    200, // response code
                    ("Content-Type", get_content_type(file_name)) //content type
                );
                response.end(data); // page data
            } else if (err.errno==-2) {
                response.writeHead(404, ("Content-Type", "text/html"));
                response.end('Error 404 Page not found');
            } else {
                console.error(`\x1b[91mERROR: ${err}\x1b[39m\x1b[0m`);
                response.writeHead(500, ("Content-Type", "text/html"));
                response.end('Error 500 Internal Server Error');
            }
        });
    }
}