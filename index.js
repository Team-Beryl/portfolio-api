import express from "express";
import { dbConnection } from "./config/db.js";
import educationRouter from "./routes/education_routes.js";

const app = express();

dbConnection();

app.use(express.json());

// routes
app.use("/api/v1", educationRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Portfolio API is Live at port ${PORT}`);
});
