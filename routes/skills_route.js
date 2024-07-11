import { Router } from "express";
import { addSkill, deleteSkill, getAllUserSkills, updateSkill } from "../controllers/skills_controller.js";

export const skillsRouter = Router()

skillsRouter.post('/users/skills', addSkill);

skillsRouter.get('/users/skills/:id', getAllUserSkills);

skillsRouter.patch('/users/skills/:id', updateSkill);

skillsRouter.delete('/users/skills/:id', deleteSkill);