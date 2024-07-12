import { Router } from "express";
import {
  deleteUserProfile,
  getAllUserProfile,
  getAUserProfile,
  getUserProfile,
  patchUserProfile,
  postUserProfile,
} from "../controllers/userProfile_controller.js";
import { remoteUpload } from "../middlewares/upload.js";

const userProfileRouter = Router();

userProfileRouter.post(
  "users/userprofiles",
  remoteUpload.single("profilePicture"),
  postUserProfile
);

userProfileRouter.get("users/userprofiles", getAllUserProfile);

userProfileRouter.get("users/userprofiles/:id", getAUserProfile);

userProfileRouter.patch("users/userprofiles/:id", patchUserProfile);

userProfileRouter.delete("users/userprofiles/:id", deleteUserProfile);

export default userProfileRouter;
