import dotenv from "dotenv"
import app from "./app.js";

dotenv.config({
    path:"./.env"
})

import connectDB from "./config/db/db.js";

connectDB().then(()=>{
    console.log(`MongoDB connection Success ✅`);
}).catch(()=>{
     console.log(`MongoDB connection failed ❌`);
     process.exit(1);
})



const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`The server is Running on http://localhost:${PORT}`);
    
})