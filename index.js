import express from "express";
import { dbConnection } from "./config/db.js";
import { skillsRouter } from "./routes/skills_route.js";


const app = express();

dbConnection();

app.use(express.json());
app.use('/api/v1', skillsRouter);

const PORT = 4000
app.listen(PORT, () => {
    console.log(`Portfolio API is Live at port ${PORT}`)
});