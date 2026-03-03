import express from 'express'
import { signin, signup } from '../controllers/auth.controller.js';



const authRoutes = express.Router();

authRoutes.route("/signup").post(signup)
authRoutes.route("/signin").post(signin)



export default authRoutes


