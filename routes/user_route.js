import { Router } from "express";
import { allUsers, getUser, login, signup } from "../controllers/user_controller.js";

export const userRouter = Router();

userRouter.post('/users/signup', signup);

userRouter.post('/users/login', login);

userRouter.get('/users', allUsers);

userRouter.get('/users/:id', getUser);