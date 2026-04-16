
import express from 'express'
import { verifyResetCode } from '../controllers/verifyCode.controller.js';



const verifyCode = express.Router();

verifyCode.route("/verify-reset-code").post(verifyResetCode)



export default verifyCode


