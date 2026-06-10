import { UserModel } from "../../../../DB/models/User.js";
import { handleError } from "../../../middleware/handelErorr.js";
import { AppError } from "../../../utils/AppErorr.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cloudinary from "../../../config/cloudinary.js";


// signup
export const signup = handleError(

    async(req,res,next)=>{
        const{name,email,password,gender} = req.body

        // check Email 
        let isFound = await UserModel.findOne({email})
        if(isFound) return next(new AppError("Email already Exist",409))


        let imageUrl = "";

         // لو المستخدم رفع صورة
         if (req.file) {

            const result = await cloudinary.uploader.upload(
                req.file.path,
                {
                folder: "profiles"
                }
            );

            imageUrl = result.secure_url;
         }    

        // add user 
        const adduser = await UserModel.create({
                name,
                email,
                password,
                gender,
                profileImage: imageUrl
            });

            res.status(201).json({
                  status: "success",
                  message: "Account created successfully",
                  
            });

    }
)



// signin
export const signin = handleError(

    async(req,res,next)=>{

          const { email, password } = req.body;
         
          //  نبحث عن اليوزر
          let user = await UserModel.findOne({ email }).select("+password");
          if (!user) return next(new AppError("Email not found", 401));

          // نتحقق من الباسورد
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return next(new AppError("Password invalid", 401));

         
        // create token
        const token = jwt.sign(
            { 
                userId: user._id,
                role: user.role 
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30m"
            }
        )

        res.status(200).json({
            message: "Login successful",
            token,
         });
    }
)






// 1-check we have token or not
// 2-verfy token 
// 3-if user of this token exist or not 
// 4-check if this token is the last one or not (change password)
// 5. Pass user to next middleware

export const protectRoutes = handleError(

    async(req,res,next)=>{

        // 1
        let {token} = req.headers 
         if(!token) return next(new AppError("Please Provide Token",401))

       // 2
       let decoded;

        try {

        decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        } catch (error) {

        return next(
            new AppError(
            "Session expired, please login again",
            401
            )
        );

        }

       // 3 
       const user = await UserModel.findById(decoded.userId)
       if (!user) {
              return res.status(404).json({ message: "User not found" });
            }
        
       // 4 
       if (user.changePasswordAt) {
                const changePasswordTime = parseInt(
                user.changePasswordAt.getTime() / 1000
            );

         if (changePasswordTime > decoded.iat) {
             return res.status(401).json({ message: "Token expired, please login again" });
            }
         }

     // 5
      req.user = user
      next();

    }  
)

