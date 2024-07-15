import { Router } from "express";
import {
  deleteUserProfile,
  getAUserProfile,
  getAllUserProfile,
  patchUserProfile,
  postUserProfile,
} from "../controllers/userProfile_controller.js";
import { remoteUpload } from "../middlewares/upload.js";

const userProfileRouter = Router();

userProfileRouter.post(
  "/api/v1/users/userprofiles",
  remoteUpload.single("profilePicture"),
  postUserProfile
);

 userProfileRouter.get("/api/v1/users/userprofiles", getAllUserProfile);

userProfileRouter.get("/api/v1/users/userprofiles/:id", getAUserProfile);

userProfileRouter.patch("/api/v1/users/userprofiles/:id", patchUserProfile);

userProfileRouter.delete("/api/v1/users/userprofiles/:id", deleteUserProfile);

export default userProfileRouter;
