import { PredictionModel } from "../../../../DB/models/Prediction.js";
import { UserModel } from "../../../../DB/models/User.js";
import cloudinary from "../../../config/cloudinary.js";
import { handleError } from "../../../middleware/handelErorr.js";
import { AppError } from "../../../utils/AppErorr.js";


// Get My Profile
export const getProfile = handleError(
  async (req, res, next) => {

    const user = await UserModel.findById(req.user._id)
      .select("-password");

    if (!user) {
      return next(
        new AppError("User not found", 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: user,
    });

  }
);


// Update Name
export const updateName = handleError(
  async (req, res, next) => {

    const { name } = req.body;

    if (!name) {
      return next(
        new AppError("Name is required", 400)
      );
    }

    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      { name },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    res.status(200).json({
      status: "success",
      message: "Name updated successfully",
      data: user,
    });

  }
);


// Update Email
export const updateEmail = handleError(
  async (req, res, next) => {

    const { email } = req.body;

    if (!email) {
      return next(
        new AppError("Email is required", 400)
      );
    }

    const existingUser = await UserModel.findOne({ email });

    if (
      existingUser &&
      existingUser._id.toString() !== req.user._id.toString()
    ) {
      return next(
        new AppError("Email already in use", 409)
      );
    }

    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      { email },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    res.status(200).json({
      status: "success",
      message: "Email updated successfully",
      data: user,
    });

  }
);


// Update Profile Image
export const updateProfileImage = handleError(
  async (req, res, next) => {

    if (!req.file) {
      return next(
        new AppError("Please upload image", 400)
      );
    }

    const currentUser = await UserModel.findById(req.user._id);

    if (!currentUser) {
      return next(
        new AppError("User not found", 404)
      );
    }

    // حذف الصورة القديمة من Cloudinary
    if (currentUser.profileImage) {

      try {

        const publicId = currentUser.profileImage
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];

        await cloudinary.uploader.destroy(publicId);

      } catch (error) {
        console.log("Old image delete error:", error.message);
      }
    }

    // رفع الصورة الجديدة
    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "profiles",
      }
    );

    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        profileImage: result.secure_url,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    res.status(200).json({
      status: "success",
      message: "Profile image updated successfully",
      data: user,
    });

  }
);


// Delete Account
export const deleteAccount = handleError(
  async (req, res, next) => {

    const user = req.user;

    if (!user) {
      return next(
        new AppError("User not found", 404)
      );
    }

    // حذف صورة البروفايل
    if (user.profileImage) {

      try {

        const publicId = user.profileImage
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];

        await cloudinary.uploader.destroy(publicId);

      } catch (error) {
        console.log("Profile image delete error:", error.message);
      }

    }

    // حذف جميع الـ Scans
    await PredictionModel.deleteMany({
      userId: user._id,
    });

    // حذف المستخدم
    await user.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Account deleted successfully",
    });

  }
);