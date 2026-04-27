import express from 'express'
import { signin, signup } from '../controllers/auth.controller.js';
import passport from "passport";
import jwt from "jsonwebtoken";
import { validate } from '../../../middleware/validation.js';
import { signinSchema, signupSchema } from '../../../validation/auth.validation.js';
import { authLimiter } from '../../../middleware/rateLimit.js';
import upload from '../../../middleware/upload.js';


const authRoutes = express.Router();

authRoutes.route("/signup").post(upload.single("image"),validate(signupSchema),signup)
authRoutes.route("/signin").post(validate(signinSchema),authLimiter,signin)
authRoutes.get("/google",passport.authenticate("google", {scope: ["profile", "email"],}));

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {

    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET
    );

    res.json({
      message: "Google login success",
      token,
    });
  }
);






export default authRoutes


