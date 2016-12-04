module.exports = {
    entry: "./src/pages/index",
    output: {
        filename: "changecoder.pages.js",
        path: __dirname + "/public/scripts"
    },
    devtool: "source-map",
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-redux": "ReactRedux",
        "redux": "Redux"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: "babel-loader",
            query: {
                presets: ["react", "es2015"]
            }
        }]
    }
}