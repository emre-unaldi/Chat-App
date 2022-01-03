const Redis = require('ioredis'); 

const getClient = () => {
    return Redis.createClient({
        host: process.env.REDIS_URI,
        port: process.env.REDIS_PORT
    });
};

module.exports.getClient = getClient;