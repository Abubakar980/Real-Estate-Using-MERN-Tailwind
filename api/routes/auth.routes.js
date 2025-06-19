import express from "express"
import { google, logout, signin, signup } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signup)
authRouter.post("/signin", signin)
authRouter.post("/google", google)
authRouter.post("/logout", logout)

export default authRouter