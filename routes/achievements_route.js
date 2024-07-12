import { Router } from "express";
import { addAchievement, deleteAchievement, getAllUserAchievements, updateOneAchievement } from "../controllers/achievements_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

export const achievementRouter = Router();

achievementRouter.post('/users/achievements', checkUserSession, addAchievement);

achievementRouter.get('/users/achievements/:userId/:achievementId', checkUserSession,  getAllUserAchievements);

achievementRouter.patch('/users/achievements/:userId/:achievementId', checkUserSession, updateOneAchievement);

achievementRouter.delete('/users/achievements/:userId/:achievementId', checkUserSession, deleteAchievement)



