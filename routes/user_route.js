import { Router } from "express";
import { getUser, getUsers, login, logout, signup, token } from "../controllers/user_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const userRouter = Router();

userRouter.post('/users/auth/signup', signup);

userRouter.post('/users/auth/login', login);

userRouter.post('/users/auth/token/login', token)

userRouter.post('/users/logout', isAuthenticated, logout)

userRouter.get('/users', isAuthenticated, getUsers);

userRouter.get('/users/auth/:username', getUser);

