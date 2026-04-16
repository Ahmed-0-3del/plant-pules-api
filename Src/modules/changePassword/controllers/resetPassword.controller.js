import { UserModel } from "../../../../DB/models/User.js"
import { handleError } from "../../../middleware/handelErorr.js"



export const resetPassword = handleError(
        async (req,res,next)=>{

                        const {email,newPassword} = req.body

                        const user = await UserModel.findOne({email}).select("+password")

                        if(!user){
                        return res.status(404).json({
                            message:"User not found"
                        })
                        }

                        if(!user.passwordResetVerified){
                        return res.status(400).json({
                            message:"OTP verification required"
                        })
                        }

                        user.password = newPassword
                        user.changePasswordAt = Date.now()

                        user.resetCode = undefined
                        user.resetCodeExpire = undefined
                        user.passwordResetVerified = false

                        await user.save()

                        res.json({
                        message:"Password reset successfully"
                        })

        }
)



