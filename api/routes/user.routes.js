import express from "express"
import { signup } from "../controllers/user.controllers.js";

const userRouter = express.Router()

userRouter.get("/test", signup)

export default userRouter;