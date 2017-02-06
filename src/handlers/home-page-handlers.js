/**
 * Created by baojian on 06/02/2017.
 */
'use strict';

const PageRenderer = require('../renderer/page-renderer');

const createPageRenderer = function(request, reply) {
    const renderer = new PageRenderer(request, reply);
    renderer.setTitle('ChangeCoder');
    renderer.init();
    return renderer;
};

module.exports = {
    globalSite: {
        handler: (request, reply) => {
            const renderer = createPageRenderer(request, reply);
            renderer.render();
        }
    }
};