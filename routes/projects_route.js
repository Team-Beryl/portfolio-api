import { Router } from "express";
import {
  deleteProject,
  getAllUserProjects,
  getUserProject,
  postProject,
  updateProject,
} from "../controllers/projects_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const projectsRouter = Router();

projectsRouter.post("/users/projects", isAuthenticated, postProject);

projectsRouter.get("/users/projects", getAllUserProjects);

projectsRouter.get('/users/projects/:id', getUserProject)

projectsRouter.patch("/users/projects/:id", isAuthenticated, updateProject);

projectsRouter.delete("/users/projects/:id", isAuthenticated, deleteProject);

export default projectsRouter;
