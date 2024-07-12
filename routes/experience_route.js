import { Router } from "express";
import {
  deleteExperience,
  getAllUserExperience,
  getOneExperience,
  postExperience,
  updateExperience,
} from "../controllers/experience_controller.js";

const experienceRouter = Router();

experienceRouter.post("users/experience", postExperience);

experienceRouter.get("users/experience", getAllUserExperience);

experienceRouter.get("users/experience", getOneExperience);

experienceRouter.patch("users/experience/:id", updateExperience);

experienceRouter.delete("users/experience/:id", deleteExperience);

export default experienceRouter;
