'use strict';

const Path = require("path");

module.exports = function(server, dir) {
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: [Path.join(dir, 'public')],
                listing: true
            }
        }
    })
};