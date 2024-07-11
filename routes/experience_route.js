import { Router } from "express";
import {
  deleteExperience,
  getAllUserExperience,
  getOneExperience,
  postExperience,
  updateExperience,
} from "../controllers/experience_controller.js";

const experienceRouter = Router();

experienceRouter.post("/api/v1/users/experience", postExperience);

experienceRouter.get("/api/v1/users/experience", getAllUserExperience);

experienceRouter.get("/api/v1/users/experience", getOneExperience);

experienceRouter.patch("/api/v1/users/experience/:id", updateExperience);

experienceRouter.delete("/api/v1/users/experience/:id", deleteExperience);

export default experienceRouter;
