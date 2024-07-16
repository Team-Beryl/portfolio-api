import { Router } from "express";
import {
  deleteEducation,
  getAllUserEducation,
  postEducation,
  updateEducation,
} from "../controllers/education_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

// Create Router
const educationRouter = Router();

// Define routes

educationRouter.post("/users/education", isAuthenticated, postEducation);

educationRouter.get("/users/education", getAllUserEducation);

educationRouter.patch(
  "/users/education/:id",
  isAuthenticated,
  updateEducation
);

educationRouter.delete(
  "/users/education/:id",
  isAuthenticated,
  deleteEducation
);

export default educationRouter;
