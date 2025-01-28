import express from "express";
import { loginUser, registerUser } from "../controllers/hrCtrl.js";

const hrRoute = express.Router();

hrRoute.post("/register", registerUser);
hrRoute.post("/login", loginUser);

export default hrRoute;
