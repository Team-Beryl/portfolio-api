import { Router } from "express";
import {
  deleteProject,
  getAllUserProjects,
  postProject,
  updateProject,
} from "../controllers/projects_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

const projectsRouter = Router();

projectsRouter.post("/users/projects", checkUserSession, postProject);

projectsRouter.get("/users/projects", getAllUserProjects);

projectsRouter.patch("/users/projects/:id", checkUserSession, updateProject);

projectsRouter.delete("/users/projects/:id", checkUserSession, deleteProject);

export default projectsRouter;
