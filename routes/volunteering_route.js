import { Router } from "express";
import {
  deleteVolunteering,
  getAllUserVolunteering,
  postVolunteering,
  updateVolunteering,
} from "../controllers/volunteering_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

const volunteeringRouter = Router();

volunteeringRouter.post("/users/volunteering", checkUserSession, postVolunteering);

volunteeringRouter.get("/users/volunteering", getAllUserVolunteering);

volunteeringRouter.patch(
  "/users/volunteering/:id",
  checkUserSession,
  updateVolunteering
);

volunteeringRouter.delete(
  "/users/volunteering/:id",
  checkUserSession,
  deleteVolunteering
);

export default volunteeringRouter;
