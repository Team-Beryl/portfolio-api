import { Router } from "express";
import { createUserSkill, deleteUserSkill, getAllUserSkills, updateUserSkill } from "../controllers/skills_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

export const skillsRouter = Router()

skillsRouter.post('/users/skills', checkUserSession, createUserSkill)

skillsRouter.get('/users/skills', checkUserSession, getAllUserSkills)

skillsRouter.patch('/users/skills/:id', checkUserSession, updateUserSkill)

skillsRouter.delete('/users/skills/:id', checkUserSession, deleteUserSkill)


