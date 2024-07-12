import { Router } from "express";
import { addSkill, deleteSkill, getAllUserSkills, updateOneSkill, updateSkill } from "../controllers/skills_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

export const skillsRouter = Router()

skillsRouter.post('/users/skills', checkUserSession, addSkill);

skillsRouter.get('/users/skills/:userId/:skillsId', checkUserSession, getAllUserSkills);

skillsRouter.patch('/users/skills/:userId/:skillsId', checkUserSession, updateOneSkill);

skillsRouter.delete('/users/skills/:userId/:skillsId', checkUserSession,  deleteSkill);


