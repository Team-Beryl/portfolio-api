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

educationRouter.post("users/education", postEducation);

educationRouter.get("users/education", getAllUserEducation);

educationRouter.get("users/education/:id", getOneEducation);

educationRouter.patch("users/education/:id", updateEducation);

educationRouter.delete("users/education/:id", deleteEducation);

export default educationRouter;
