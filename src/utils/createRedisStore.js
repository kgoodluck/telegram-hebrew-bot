import { Redis } from "@telegraf/session/redis";
import { createClient } from "redis";

export async function createRedisStore() {
    const store = Redis({ url: process.env.REDIS_URL });

    // Create a dedicated Redis client for pinging
    const pingClient = createClient({ url: process.env.REDIS_URL });
    pingClient.on("error", (err) => console.error("Redis Ping Client Error:", err));
    await pingClient.connect();

    // Ping Redis every 5 minutes (300,000 ms) to keep the instance awake
    setInterval(async () => {
        try {
            await pingClient.ping();
            console.log("✅ Keeping Redis alive...");
        } catch (error) {
            console.error("❌ Redis ping failed:", error);
        }
    }, 300000);

    return store;
}
