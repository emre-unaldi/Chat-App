const Redis = require('ioredis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = new Redis();

module.exports = new RedisStore({ 
    client: redisClient,
    host: process.env.REDIS_URI,
    port:process.env.REDIS_PORT,
    pass: process.env.REDIS_PASS 
});





























/*
const redis = require('redis');
const client = redis.createClient({
    host: process.env.REDIS_URI,
    port:process.env.REDIS_PORT,
    pass: process.env.REDIS_PASS
});

client.on('error', (err) => {
    console.log('Error: ', err);
});

module.exports = client;
*/
