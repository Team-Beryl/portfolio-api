import express from "express";
import mongoose from "mongoose";
import expressOasGenerator from '@mickeymond/express-oas-generator';
import cors from 'cors';
import session from "express-session";
import MongoStore from "connect-mongo";
import { dbConnection } from "./config/db.js";
import volunteeringRouter from "./routes/volunteering_route.js";
import experienceRouter from "./routes/experience_route.js";
import educationRouter from "./routes/education_routes.js";
import projectsRouter from "./routes/projects_route.js";
import { achievementRouter } from "./routes/achievements_route.js";
import { skillsRouter } from "./routes/skills_route.js";
import { userRouter } from "./routes/user_route.js";
import userProfileRouter from "./routes/userProfile_routes.js";


const app = express();

expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['auth','achievements', 'education', 'experiences', 'projects', 'skills', 'volunteering'],
    mongooseModels: mongoose.modelNames(),
});




app.use(cors());
app.use(express.json());
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
app.use('/api/v1', userProfileRouter);
app.use("/api/v1", projectsRouter);
app.use("/api/v1", educationRouter);
app.use("/api/v1", volunteeringRouter);
app.use("/api/v1", experienceRouter);
app.use('/api/v1', achievementRouter);
app.use('/api/v1', skillsRouter);

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));

dbConnection();


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Portfolio API is Live at port ${PORT}`);
});
