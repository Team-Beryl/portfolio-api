import express from "express";
import { dbConnection } from "./config/db.js";
import { achievementRouter } from "./routes/achievements_route.js";


const app = express();

dbConnection();

app.use(express.json());
app.use(achievementRouter);

const PORT = 4000
app.listen(PORT, () => {
    console.log(`Portfolio API is Live at port ${PORT}`)
});