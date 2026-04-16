
import bcrypt from "bcrypt";
import { handleError } from "../../../middleware/handelErorr.js";
import { UserModel } from "../../../../DB/models/User.js";

export const verifyResetCode = handleError(
     async (req,res,next)=>{

                    try{

                    const {email, otp} = req.body

                    const user = await UserModel.findOne({email})

                    if(!user){
                    return res.status(404).json({message:"User not found"})
                    }

                    if(user.resetCodeExpire < Date.now()){
                    return res.status(400).json({
                        message:"OTP expired"
                    })
                    }

                    const isMatch = await bcrypt.compare(otp,user.resetCode)

                    if(!isMatch){
                    return res.status(400).json({
                        message:"Invalid OTP"
                    })
                    }
                    
                      user.passwordResetVerified = true
                      await user.save()

                      
                    res.json({
                    message:"OTP verified"
                    })

                    }catch(err){
                    res.status(500).json({message:err.message})
                    }

    }


)