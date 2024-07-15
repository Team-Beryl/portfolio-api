import { Router } from "express";
import {
  deleteUserProfile,
  getAllUserProfile,
  patchUserProfile,
  postUserProfile,
} from "../controllers/userProfile_controller.js";
import { remoteUpload } from "../middlewares/upload.js";
import { checkUserSession } from "../middlewares/auth.js";

const userProfileRouter = Router();

userProfileRouter.post(
  "/users/userProfile",
  checkUserSession,
  remoteUpload.single("profilePicture"),
  postUserProfile
);


userProfileRouter.get("/users/userProfile", getAllUserProfile);

userProfileRouter.patch(
  "/users/userProfile/:id",
  checkUserSession,
  patchUserProfile
);

userProfileRouter.delete(
  "/users/userProfile/:id",
  checkUserSession,
  deleteUserProfile
);

export default userProfileRouter;
