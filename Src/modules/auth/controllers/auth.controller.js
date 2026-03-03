import { UserModel } from "../../../../DB/models/User.js";
import { handleError } from "../../../middleware/handelErorr.js";
import { AppError } from "../../../utils/AppErorr.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// signup
export const signup = handleError(

    async(req,res,next)=>{
        const{name,email,password} = req.body

        // check Email 
        let isFound = await UserModel.findOne({email})
        if(isFound) return next(new AppError("Email already Exist",409))

        // add user 
        const adduser = await UserModel.create({
                name,
                email,
                password
            });

        res.status(200).json({message:"Done",adduser})
    }
)


// signin
export const signin = handleError(

    async(req,res,next)=>{

          const { email, password } = req.body;
         
          //  نبحث عن اليوزر
          let user = await UserModel.findOne({ email })
          if (!user) return next(new AppError("Email not found", 401));

          // نتحقق من الباسورد
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return next(new AppError("Password invalid", 401));

         
        // create token
        const token = jwt.sign(
            { name: user.name, userId: user._id},"Ahmed1372004"
        )

        res.status(200).json({
            message: "Login successful",
            token,
            // user: {
            //         id: user._id,
            //         name: user.name,
            //         email: user.email,
            //     }
         });
    }
)




