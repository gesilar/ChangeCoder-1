const mongodb = {
    username: "coder",
    password: "123",
    url: "139.196.12.240",
    port: 27017,
    database: "changecoder"
};

module.exports = {
    connectUrl: `mongodb://${mongodb.username}:${mongodb.password}@${mongodb.url}:${mongodb.port}/${mongodb.database}`,
};