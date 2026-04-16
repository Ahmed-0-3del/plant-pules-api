
import express from 'express'
import { resetPassword } from '../controllers/resetPassword.controller.js';



const changePassword = express.Router();

changePassword.route("/reset-password").post(resetPassword)



export default changePassword


