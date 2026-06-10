import express from 'express'
import {  signin, signup } from '../controllers/auth.controller.js';
import passport from "passport";
import jwt from "jsonwebtoken";
import { validate } from '../../../middleware/validation.js';
import { imageSchema, signinSchema, signupSchema } from '../../../validation/auth.validation.js';
import { authLimiter } from '../../../middleware/rateLimit.js';
import upload from '../../../middleware/upload.js';
import { googleLoginMobile } from '../controllers/googleAuth_Flutter.controller.js';


const authRoutes = express.Router();

authRoutes.route("/signup").post(upload.single("image"),validate({ body: signupSchema,file: imageSchema}),signup)
authRoutes.route("/signin").post(validate(signinSchema),authLimiter,signin)
authRoutes.get("/google",passport.authenticate("google", {scope: ["profile", "email"],}));
authRoutes.post("/google/mobile",googleLoginMobile );

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {

    const token = jwt.sign(
      {
         userId: req.user._id ,
         role: req.user.role,
        },
      process.env.JWT_SECRET,
          {
            expiresIn: "30m"
          }
    );

    res.json({
      message: "Google login success",
      token,
    });
  }
);






export default authRoutes


