import { Router } from "express";
import {
  deleteExperience,
  getAllUserExperience,
  getUserExperience,
  postExperience,
  updateExperience,
} from "../controllers/experience_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const experienceRouter = Router();

experienceRouter.post("/users/experiences", isAuthenticated, postExperience);

experienceRouter.get("/users/experiences", getAllUserExperience);

experienceRouter.get('/users/experiences/:id', getUserExperience)

experienceRouter.patch(
  "/users/experiences/:id",
  isAuthenticated,
  updateExperience
);

experienceRouter.delete(
  "/users/experiences/:id",
  isAuthenticated,
  deleteExperience
);

export default experienceRouter;
