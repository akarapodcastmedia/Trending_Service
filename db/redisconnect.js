const redis = require("redis");

const redisClient = redis.createClient({
    url : 'redis://cache.akarahub.tech:6379'
});
(async()=> await redisClient.connect())();
redisClient.on('ready',()=> console.log("connect to cache3 successfully"));
redisClient.on('error',(err)=>console.log("error during connecting to redis server ..."));
module.exports= {
    redisClient
}