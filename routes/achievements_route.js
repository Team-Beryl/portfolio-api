import { Router } from "express";
import {createUserAchievement, deleteUserAchievement, getAllUserAchievements, updateUserAchievement } from "../controllers/achievements_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/upload.js";

export const achievementRouter = Router();

achievementRouter.post('/users/achievements', checkUserSession, createUserAchievement)

achievementRouter.get('/users/achievements', checkUserSession, getAllUserAchievements)

achievementRouter.patch('/users/achievements/:id', checkUserSession, updateUserAchievement)

achievementRouter.delete('/users/achievements/:id', checkUserSession, deleteUserAchievement)

//remoteUpload.single('image'),

