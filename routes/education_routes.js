import { Router } from "express";
import {
  deleteEducation,
  getAllUserEducation,
  getOneEducation,
  postEducation,
  updateEducation,
} from "../controllers/education_controller.js";

// Create Router
const educationRouter = Router();

// Define routes

educationRouter.post("/api/v1/users/education", postEducation);

educationRouter.get("/api/v1/users/education", getAllUserEducation);

educationRouter.get("/api/v1/users/education/:id", getOneEducation);

educationRouter.patch("/api/v1/users/education/:id", updateEducation);

educationRouter.delete("/api/v1/users/education/:id", deleteEducation);

export default educationRouter;
