// redisClient.js
import redis from "redis";

export const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

await redisClient.connect();