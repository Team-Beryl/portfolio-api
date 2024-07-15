import { Router } from "express";
import {
  deleteVolunteering,
  getAllUserVolunteering,
  postVolunteering,
  updateVolunteering,
} from "../controllers/volunteering_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

const volunteeringRouter = Router();

volunteeringRouter.post("/volunteering", checkUserSession, postVolunteering);

volunteeringRouter.get("/volunteering", getAllUserVolunteering);

volunteeringRouter.patch(
  "/volunteering/:id",
  checkUserSession,
  updateVolunteering
);

volunteeringRouter.delete(
  "/volunteering/:id",
  checkUserSession,
  deleteVolunteering
);

export default volunteeringRouter;
