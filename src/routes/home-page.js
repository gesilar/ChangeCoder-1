/**
 * Created by baojian on 06/02/2017.
 */

'use strict';

const handlers = require("../handlers/home-page-handlers");

module.exports = function (server) {
    server.route({
        method: 'GET',
        path: '/',
        config: handlers.globalSite
    });
};