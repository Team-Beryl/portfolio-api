import { Router } from "express";
import { addAchievement, deleteAchievement, getAllUserAchievements, updateAchievement } from "../controllers/achievements_controller.js";

export const achievementRouter = Router();

achievementRouter.post('/users/achievements', addAchievement);

achievementRouter.get('/users/achievements/:id', getAllUserAchievements);

achievementRouter.patch('/users/achievements/:id', updateAchievement);

achievementRouter.delete('/users/achievements/:id', deleteAchievement)

