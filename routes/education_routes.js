import { Router } from "express";
import {
  deleteEducation,
  getAllUserEducation,
  postEducation,
  updateEducation,
} from "../controllers/education_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

// Create Router
const educationRouter = Router();

// Define routes

educationRouter.post("/users/education", checkUserSession, postEducation);

educationRouter.get("/users/education", getAllUserEducation);

educationRouter.patch(
  "/users/education/:id",
  checkUserSession,
  updateEducation
);

educationRouter.delete(
  "/users/education/:id",
  checkUserSession,
  deleteEducation
);

export default educationRouter;
