import { UserModel } from "../../../../DB/models/User.js";
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


//  Update Profile
export const updateProfile = handleError(
  async (req, res, next) => {

    const { name, email } = req.body;

    const existingUser = await UserModel.findOne({ email });

        if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
          return next(new AppError("Email already in use", 409));
        }

    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: user,
    });
  }
);


