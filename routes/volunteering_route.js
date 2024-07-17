import { Router } from "express";
import {
  deleteVolunteering,
  getAllUserVolunteering,
  getUserVolunteering,
  postVolunteering,
  updateVolunteering,
} from "../controllers/volunteering_controller.js";
import {isAuthenticated } from "../middlewares/auth.js";

const volunteeringRouter = Router();

volunteeringRouter.post("/users/volunteering", isAuthenticated, postVolunteering);

volunteeringRouter.get("/users/volunteering", getAllUserVolunteering);

volunteeringRouter.get('/users/volunteering/:id', getUserVolunteering);

volunteeringRouter.patch(
  "/users/volunteering/:id",
  isAuthenticated,
  updateVolunteering
);

volunteeringRouter.delete(
  "/users/volunteering/:id",
  isAuthenticated,
  deleteVolunteering
);

export default volunteeringRouter;
