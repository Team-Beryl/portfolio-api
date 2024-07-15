import { Router } from "express";
import {createUserAchievement, deleteUserAchievement, getAllUserAchievements, updateUserAchievement } from "../controllers/achievements_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

export const achievementRouter = Router();

achievementRouter.post('/users/achievement', checkUserSession, createUserAchievement)

achievementRouter.get('/users/achievement', checkUserSession, getAllUserAchievements)

achievementRouter.patch('/users/achievement/:id', checkUserSession, updateUserAchievement)

achievementRouter.delete('/users/achievement/:id', checkUserSession, deleteUserAchievement)



