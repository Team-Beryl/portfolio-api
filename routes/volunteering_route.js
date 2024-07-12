import { Router } from "express";
import {
  deleteVolunteering,
  getAllUserVolunteering,
  getOneVolunteering,
  postVolunteering,
  updateVolunteering,
} from "../controllers/volunteering_controller.js";

const volunteeringRouter = Router();

volunteeringRouter.post("volunteering", postVolunteering);

volunteeringRouter.get("volunteering", getAllUserVolunteering);

volunteeringRouter.get("volunteering/:id", getOneVolunteering);

volunteeringRouter.patch("volunteering/:id", updateVolunteering);

volunteeringRouter.delete("volunteering/:id", deleteVolunteering);

export default volunteeringRouter;
