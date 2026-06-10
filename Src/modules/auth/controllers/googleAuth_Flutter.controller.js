import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import { AppError } from "../../../utils/AppErorr.js";
import { handleError } from "../../../middleware/handelErorr.js";
import { UserModel } from "../../../../DB/models/User.js";


dotenv.config();

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

export const googleLoginMobile = handleError(

  async (req, res, next) => {

    const { idToken } = req.body;

    if (!idToken) {
      return next(
        new AppError("Google token is required", 400)
      );
    }

    // verify token with google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const email = payload.email;
    const name = payload.name;
    const picture = payload.picture;
    const googleId = payload.sub;

    let user = await UserModel.findOne({ email });

    // لو الحساب معمول بالباسورد
    if (user && user.provider === "local") {
      return next(
        new AppError(
          "This email is already registered with password login",
          409
        )
      );
    }

    // register
    if (!user) {

      user = await UserModel.create({
        name,
        email,
        googleId,
        profileImage: picture,
        provider: "google",
      });

    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m"
      }
    );

    res.status(200).json({
      status: "success",
      message: "Google login successful",
      token,
    });

  }

);





