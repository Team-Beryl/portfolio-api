import { Router } from "express";
import {
  deleteExperience,
  getAllUserExperience,
  postExperience,
  updateExperience,
} from "../controllers/experience_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

const experienceRouter = Router();

experienceRouter.post("/users/experience", checkUserSession, postExperience);

experienceRouter.get("/users/experience", getAllUserExperience);

experienceRouter.patch(
  "/users/experience/:id",
  checkUserSession,
  updateExperience
);

experienceRouter.delete(
  "/users/experience/:id",
  checkUserSession,
  deleteExperience
);

export default experienceRouter;
