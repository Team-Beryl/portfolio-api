import { Router } from "express";
import {
  deleteUserProfile,
  getAUserProfile,
  getAllUserProfile,
  patchUserProfile,
  postUserProfile,
} from "../controllers/userProfile_controller.js";
import { remoteUpload } from "../middlewares/upload.js";
import { checkUserSession } from "../middlewares/auth.js";

const userProfileRouter = Router();

userProfileRouter.post(
  "/users/userprofiles",
  checkUserSession,
  remoteUpload.single("profilePicture"),
  postUserProfile
);


userProfileRouter.get("/users/userprofiles", getAllUserProfile);
 userProfileRouter.get("/api/v1/users/userprofiles", getAllUserProfile);

userProfileRouter.patch(
  "/users/userprofiles/:id",
  checkUserSession,
  patchUserProfile
);

userProfileRouter.delete(
  "/users/userprofiles/:id",
  checkUserSession,
  deleteUserProfile
);

export default userProfileRouter;
