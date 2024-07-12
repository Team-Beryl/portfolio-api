import { Router } from "express";
import { allUsers, getUser, login, logout, signup } from "../controllers/user_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

export const userRouter = Router();

userRouter.post('/users/signup', signup);

userRouter.post('/users/login', login);

userRouter.post('/users/logout', checkUserSession, logout)

userRouter.get('/users', checkUserSession, allUsers);

userRouter.get('/users/:username', checkUserSession, getUser);

