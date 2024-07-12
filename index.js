import express from "express";
import { dbConnection } from "./config/db.js";
import volunteeringRouter from "./routes/volunteering_route.js";

const app = express();

dbConnection();

app.use(express.json());

app.use("/api/v1/", volunteeringRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Portfolio API is Live at port ${PORT}`);
});
