
import express from "express";
import { protectRoutes } from "../controllers/auth.controller.js";
import { deleteAccount, getProfile, updateEmail, updateName, updateProfileImage } from "../controllers/profile.controller.js";
import upload from "../../../middleware/upload.js";

const userRoutes = express.Router();

// profile
userRoutes.get("/profile", protectRoutes, getProfile);


//  update Name 
userRoutes.put("/profile/name",protectRoutes,updateName);

//  update Email
userRoutes.put("/profile/email",protectRoutes,updateEmail);

//  update profile image 
userRoutes.put("/profile/image",protectRoutes,upload.single("image"),updateProfileImage);


//delete
userRoutes.delete("/profile",protectRoutes,deleteAccount);


export default userRoutes;

