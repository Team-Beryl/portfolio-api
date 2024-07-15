import { Router } from "express";
import { getUser, getUsers, login, logout, signup } from "../controllers/user_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

export const userRouter = Router();

userRouter.post('/users/signup', signup);

userRouter.post('/users/login', login);

userRouter.post('/users/logout', checkUserSession, logout)

userRouter.get('/users', checkUserSession, getUsers);

userRouter.get('/users/:username', checkUserSession, getUser);

