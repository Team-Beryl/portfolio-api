import express from "express";
import { dbConnection } from "./config/db.js";
import { skillsRouter } from "./routes/skills_route.js";
import { userRouter } from "./routes/user_route.js";
import userProfileRouter from "./routes/userProfile_routes.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from 'cors';
import expressOasGenerator from "express-oas-generator";
import mongoose from "mongoose";



const app = express();
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['users'],
    mongooseModels: mongoose.modelNames(),
});

dbConnection();
app.use(cors());
app.use(express.json());
app.use('/api/v1', skillsRouter);
app.use(session({
    secret: process.env.SESSION_SECRET,
      resave: false,
     saveUninitialized: true,
     //cookie: { secure: true }
     store:MongoStore.create({
        mongoUrl: process.env.MONGO_URL
     })
}));
app.use('/api/v1', userRouter)
app.use(userProfileRouter);

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));


const PORT = 4000
app.listen(PORT, () => {
    console.log(`Portfolio API is Live at port ${PORT}`)
});