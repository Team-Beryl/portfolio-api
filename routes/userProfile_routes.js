import { Router } from "express";
import { deleteUserProfile, getAUserProfile, getUserProfile, patchUserProfile, postUserProfile } from "../controllers/userProfile_controller.js";
import { remoteUpload } from "../middlewares/upload.js";

const userProfileRouter = Router();

userProfileRouter.post('/userprofiles', remoteUpload.single('profile_picture'), postUserProfile)

userProfileRouter.get('/userprofiles', getUserProfile)

userProfileRouter.get('/userprofiles/:id', getAUserProfile)

userProfileRouter.patch('/userprofiles/:id', patchUserProfile)

userProfileRouter.delete('/userprofiles/:id', deleteUserProfile)

export default userProfileRouter;