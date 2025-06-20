import express from "express"
import { deleteUser, google, logout, signin, signup, updateUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const authRouter = express.Router();

authRouter.post("/signup", signup)
authRouter.post("/signin", signin)
authRouter.post("/google", google)
authRouter.post("/logout", logout)
authRouter.put('/update/:id',verifyToken, updateUser);
authRouter.delete("/delete/:id", verifyToken, deleteUser);

export default authRouter