
import express from "express";
import { protectRoutes } from "../controllers/auth.controller.js";
import { getProfile, updateProfile } from "../controllers/profile.controller.js";

const userRoutes = express.Router();

// profile
userRoutes.get("/profile", protectRoutes, getProfile);

//  update
userRoutes.put("/profile", protectRoutes, updateProfile);

export default userRoutes;

