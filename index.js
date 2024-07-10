import express from "express";
import { dbConnection } from "./config/db.js";
import userProfileRouter from "./routes/userProfile_routes.js";


const app = express();

dbConnection();

app.use(express.json());
app.use(userProfileRouter);

const PORT = 4000
app.listen(PORT, () => {
    console.log(`Portfolio API is Live at port ${PORT}`)
});