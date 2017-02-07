const Hapi = require("hapi");

const server = new Hapi.Server();

const staticRoute = require("./src/routes/static-files");

server.connection({
    port: 8080,
    host: "localhost"
});

server.register(require("inert"), (err) => {
    if (err) {
        throw err;
    }
});

staticRoute(server, __dirname);

server.start((err) => {
    if (err) {
        server.log(["error"], err);
        throw err;
    }

    console.log(`Server started at: ${server.info.uri}`);
    server.log(['Info'], `Server started at: ${server.info.uri}`);
})