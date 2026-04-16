import nodemailer from 'nodemailer'
import { handleError } from '../../../middleware/handelErorr.js'
import { UserModel } from '../../../../DB/models/User.js'
import { sendOTPEmail } from '../../../utils/sendEmail.js'
import bcrypt from 'bcrypt'

export const forgotPassword = handleError(
       
    async (req,res,next)=>{

      try{

            const {email} = req.body

            const user = await UserModel.findOne({email})

            if(!user){
            return res.status(404).json({message:"User not found"})
            }

            const code = Math.floor(100000 + Math.random() * 900000).toString()
            const hashedOTP = await bcrypt.hash(code,10)
            user.resetCode = hashedOTP
            user.resetCodeExpire = Date.now() + 10 * 60 * 1000

            await user.save()
            
            await sendOTPEmail(user.email,code)
            res.json({
            message:"OTP sent to your email",
            })

       }catch(err){
            res.status(500).json({message:err.message})
            }
    }
)




