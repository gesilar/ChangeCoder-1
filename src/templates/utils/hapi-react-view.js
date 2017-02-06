'use strict';

const React = require('react');
const ReactDOMServer = require('react-dom/server');

const compile = function compile(template, compileOpts) {
    return function runtime(context) {
        let View = require(compileOpts.filename);
        View = View.default || View;

        const viewElement = React.createFactory(View);
        const content = ReactDOMServer.renderToStaticMarkup(viewElement(context));

        if (context.pjax) {
            const result = {content, styles: context.styles, scripts: context.scripts, title: context.title};
            return Json.stringify(result);
        } else {
            return `<!DOCTYPE html>${content}`;
        }
    };
};

module.exports = {
    compile
};