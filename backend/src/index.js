import dotenv from "dotenv"
import app from "./app.js";

dotenv.config({
    path: "./.env"
});

import connectDB from "./config/db/db.js";

connectDB().then(() => {
    console.log(`MongoDB connection Success ✅`);
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`The server is Running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error(`MongoDB connection failed ❌`, err);
    process.exit(1);
});
