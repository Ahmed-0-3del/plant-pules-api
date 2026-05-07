import { PredictionModel } from "../../../../DB/models/Prediction.js";
import { UserModel } from "../../../../DB/models/User.js";
import cloudinary from "../../../config/cloudinary.js";
import { handleError } from "../../../middleware/handelErorr.js";
import { AppError } from "../../../utils/AppErorr.js";


//  Get My Profile
export const getProfile = handleError(
  async (req, res, next) => {

    const user = await UserModel.findById(req.user._id).select("-password");

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  }
);




export const updateProfile = handleError(
  async (req, res, next) => {

    const { name, email, gender } = req.body;

    let updateData = {};

    // Check Email Exists
    if (email) {

      const existingUser = await UserModel.findOne({ email });

      if (
        existingUser &&
        existingUser._id.toString() !== req.user._id.toString()
      ) {
        return next(
          new AppError("Email already in use", 409)
        );
      }

      updateData.email = email;
    }

    if (name) updateData.name = name;

    if (gender) updateData.gender = gender;
 
  // Image
   if (req.file) {

      const result = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "profiles"
        }
      );

      updateData.profileImage = result.secure_url;
    }

    // Update
    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).select("-password");

    res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: user
    });

    

  }
);




// delete
export const deleteAccount = handleError(
  async (req, res, next) => {

    const user = req.user;

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    
    // حذف صورة البروفايل من Cloudinary
    if (user.profileImage) {

      const publicId = user.profileImage
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];

      await cloudinary.uploader.destroy(publicId);
    }

    //  حذف كل الـ scans الخاصة بالمستخدم
    await PredictionModel.deleteMany({
      userId: user._id
    });

    //  حذف المستخدم
    
    await user.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Account deleted successfully"
    });
  }
);


//  Update Profile
// export const updateProfile = handleError(
//   async (req, res, next) => {

//     const { name, email } = req.body;

//     const existingUser = await UserModel.findOne({ email });

//         if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
//           return next(new AppError("Email already in use", 409));
//         }

//     const user = await UserModel.findByIdAndUpdate(
//       req.user._id,
//       { name, email },
//       { new: true, runValidators: true }
//     ).select("-password");

//     res.status(200).json({
//       status: "success",
//       message: "Profile updated successfully",
//       data: user,
//     });
//   }
// );


