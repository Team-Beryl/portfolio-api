import { Router } from "express";
import {
  deleteUserProfile,
  getAllUserProfile,
  patchUserProfile,
  postUserProfile,
} from "../controllers/userProfile_controller.js";
import { remoteUpload } from "../middlewares/upload.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userProfileRouter = Router();

userProfileRouter.post(
  "/users/userProfile",
  isAuthenticated,
  remoteUpload.fields([{ name: "profilePicture", maxCount: 1 }]),
  postUserProfile
);

userProfileRouter.get("/users/userProfile", getAllUserProfile);

userProfileRouter.patch(
  "/users/userProfile/:id",
  isAuthenticated,
  patchUserProfile
);

userProfileRouter.delete(
  "/users/userProfile/:id",
  isAuthenticated,
  deleteUserProfile
);

export default userProfileRouter;
