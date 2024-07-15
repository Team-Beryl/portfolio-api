import { Router } from "express";
import { createUserSkill, deleteUserSkill, getAllUserSkills, updateUserSkill } from "../controllers/skills_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

export const skillsRouter = Router()

skillsRouter.post('/users/skill', checkUserSession, createUserSkill)

skillsRouter.get('/users/skill', checkUserSession, getAllUserSkills)

skillsRouter.patch('/users/skill/:id', checkUserSession, updateUserSkill)

skillsRouter.delete('/users/skill/:id', checkUserSession, deleteUserSkill)


