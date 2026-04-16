
import express from 'express'
import { forgotPassword } from '../controllers/forgetPassword.controller.js';



const forgetPassword = express.Router();

forgetPassword.route("/forgot-password").post(forgotPassword)



export default forgetPassword





