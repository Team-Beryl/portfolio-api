import { Router } from "express";
import {
  deleteExperience,
  getAllUserExperience,
  postExperience,
  updateExperience,
} from "../controllers/experience_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

const experienceRouter = Router();

experienceRouter.post("/users/experiences", checkUserSession, postExperience);

experienceRouter.get("/users/experiences", getAllUserExperience);

experienceRouter.patch(
  "/users/experiences/:id",
  checkUserSession,
  updateExperience
);

experienceRouter.delete(
  "/users/experiences/:id",
  checkUserSession,
  deleteExperience
);

export default experienceRouter;
