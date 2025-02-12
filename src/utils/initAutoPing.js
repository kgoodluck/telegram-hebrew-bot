import axios from "axios";

export async function initAutoPing(app) {
    app.get("/ping", (req, res) => {
        res.send("pong");
    });

    if (process.env.PUBLIC_URL) {
        const PUBLIC_URL = process.env.PUBLIC_URL;

        setInterval(async () => {
            try {
                const response = await axios.get(`${PUBLIC_URL}/ping`);
            } catch (error) {
                console.error("❌❌❌ Keep-alive ping failed:", error);
            }
        }, 5 * 60 * 1000); // Ping every 5 minutes
    }

    return;
}
