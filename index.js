import express from "express";
import { dbConnection } from "./config/db.js";


const app = express();

dbConnection();

app.use(express.json());

const PORT = 4000
app.listen(PORT, () => {
    console.log(`Portfolio API is Live at port ${PORT}`)
});