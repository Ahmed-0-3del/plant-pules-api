
import express from "express";
import { protectRoutes } from "../controllers/auth.controller.js";
import { getProfile, updateProfile } from "../controllers/profile.controller.js";
import upload from "../../../middleware/upload.js";

const userRoutes = express.Router();

// profile
userRoutes.get("/profile", protectRoutes, getProfile);


//  update
userRoutes.put("/profile",protectRoutes,upload.single("image"),updateProfile);

export default userRoutes;

