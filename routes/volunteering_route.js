import { Router } from "express";
import {
  deleteVolunteering,
  getAllUserVolunteering,
  getOneVolunteering,
  postVolunteering,
  updateVolunteering,
} from "../controllers/volunteering_controller.js";

const volunteeringRouter = Router();

volunteeringRouter.post("/api/v1/users/volunteering", postVolunteering);

volunteeringRouter.get("/api/v1/users/volunteering", getAllUserVolunteering);

volunteeringRouter.get("/api/v1/users/volunteering/:id", getOneVolunteering);

volunteeringRouter.patch("/api/v1/users/volunteering/:id", updateVolunteering);

volunteeringRouter.delete("/api/v1/users/volunteering/:id", deleteVolunteering);

export default volunteeringRouter;
