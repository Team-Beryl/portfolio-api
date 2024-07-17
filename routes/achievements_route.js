import { Router } from "express";
import {createUserAchievement, deleteUserAchievement, getAllUserAchievements, getUserAchievement, updateUserAchievement } from "../controllers/achievements_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/upload.js";


export const achievementRouter = Router();

achievementRouter.post('/users/achievements', isAuthenticated, remoteUpload.single('image'), createUserAchievement)

achievementRouter.get('/users/achievements', getAllUserAchievements)

achievementRouter.get('/users/achievements/:id', getUserAchievement)

achievementRouter.patch('/users/achievements/:id', isAuthenticated, updateUserAchievement)

achievementRouter.delete('/users/achievements/:id', isAuthenticated, deleteUserAchievement)


