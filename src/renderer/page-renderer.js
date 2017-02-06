/**
 * Created by baojian on 06/02/2017.
 */
'use strict';

const Promise = require('bluebird');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const SharedApps = require("changecoder-global").default;
const contextManager = require("changecoder-utils").contextManager;

class PageRenderer {

    constructor(request, reply) {
        this._title = 'ChangeCoder';
        this._scripts = [];
        this._styles = [];
        this._promises = [];
        this._pjax = false;
        this._appMap = {};
        this._appCount = 0;
        this._request = request;
        this._reply = reply;
    }

    init() {
        this._addAssets();
        this._addGlobalWidgets();
    }

    _addAssets() {
        this._styles = ['styles/common.css'];
    }

    _addGlobalWidgets() {
        this._initApp(SharedApps.PageHeader, {}, 'header');
        this._initApp(SharedApps.PageFooter, {}, 'footer');
    }

    _initApp(app, args, area) {
        args = !args ? {} : args;

        const contextId = contextManager.createContext({
            widgetId: app.id,
            request: this._request,
            reply: this._reply
        });

        args.contextId = contextId;

        const appKey = app.id + this._appCount.toString();
        this._appCount++;
        const p = this._createApp(app, args, appKey);
        this._promises.push(p);
        this._appMap[appKey] = {area};
        return p;
    }

    _createApp(app, args, appKey) {
        const argData = !args ? null : JSON.stringify(args);
        const props = {key: appKey};
        const renderMode = app.renderMode.toLowerCase();
        props.className = (renderMode === 'server') ? 'changecoder-app' : `changecoder-app ${app.id}--widget`;

        if (renderMode === 'client') {
            props['data-params'] = argData;
            const result = React.createElement('div', props);
            return Promise.resolve(result);
        }

        return app.create(args, {}).then((result) => {
            const component = result.component;
            const store = result.store;
            let outputHtml = null;
            if (renderMode === 'server') {
                outputHtml = ReactDOMServer.renderToStaticMarkup(component);
            } else {
                outputHtml =ReactDOMServer.renderToString(component);
            }
            props.dangerouslySetInnerHTML = {__html: outputHtml};

            if (renderMode === 'both') {
                props['data-params'] = argData;
                props['data-state'] = JSON.stringify(store);
            }

            return React.createElement('div', props);
        })
    }

    setTitle(title) {
        this._title = title;
    }

    render() {
        const self = this;

        return Promise.all(this._promises).then((data) => {
            const result = {
                title: self._title,
                scripts: self._scripts,
                styles: self._styles,
                pjax: self._pjax,
                header: [],
                footer: [],
                middle: []
            }

            const appAreas = ['header', 'footer'];

            data.forEach((app) => {
                const appLayout = self._appMap[app.key];

                if (appAreas.indexOf(appLayout.area) >= 0) {
                    result[appLayout.area].push(app);
                } else {
                    appLayout.app = app;
                    result.middle.push(appLayout);
                }
            });

            if (self._pjax) {
                return self._reply.view('pjax', result);
            } else {
                return self._reply.view('page', result);
            }
        });
    }

}