import { Router } from "express";
import { createUserSkill, deleteUserSkill, getAllUserSkills, getUserSkill, updateUserSkill } from "../controllers/skills_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";


export const skillsRouter = Router()

skillsRouter.post('/users/skills', isAuthenticated, createUserSkill)

skillsRouter.get('/users/skills', getAllUserSkills);

skillsRouter.get('/users/skills/:id', getUserSkill);

skillsRouter.patch('/users/skills/:id', isAuthenticated, updateUserSkill)

skillsRouter.delete('/users/skills/:id', isAuthenticated, deleteUserSkill)


