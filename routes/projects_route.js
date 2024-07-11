import { Router } from "express";
import {
  deleteProject,
  getAllUserProjects,
  getOneProject,
  postProject,
  updateProject,
} from "../controllers/projects_controller.js";

const projectsRouter = Router();

projectsRouter.post("/api/v1/users/projects", postProject);

projectsRouter.get("/api/v1/users/projects", getAllUserProjects);

projectsRouter.get("/api/v1/users/projects/:id", getOneProject);

projectsRouter.patch("/api/v1/users/projects/:id", updateProject);

projectsRouter.delete("/api/v1/users/projects/:id", deleteProject);

export default projectsRouter;
