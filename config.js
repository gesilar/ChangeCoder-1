const mongodb = {
    username: "sa",
    password: "123",
    url: "ds119588.mlab.com",
    port: 19588,
    database: "changecoder"
};

export default {
    connectUrl: `mongodb://${mongodb.username}:${mongodb.password}@${mongodb.url}:${mongodb.port}/{mongodb.database}`,
}