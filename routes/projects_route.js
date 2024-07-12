import { Router } from "express";
import {
  deleteProject,
  getAllUserProjects,
  getOneProject,
  postProject,
  updateProject,
} from "../controllers/projects_controller.js";

const projectsRouter = Router();

projectsRouter.post("users/projects", postProject);

projectsRouter.get("users/projects", getAllUserProjects);

projectsRouter.get("users/projects/:id", getOneProject);

projectsRouter.patch("users/projects/:id", updateProject);

projectsRouter.delete("users/projects/:id", deleteProject);

export default projectsRouter;
