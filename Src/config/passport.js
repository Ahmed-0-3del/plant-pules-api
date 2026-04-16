
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../../DB/models/User.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/v1/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await UserModel.findOne({ email });

        // لو مش موجود → نعمله register
        if (!user) {
          user = await UserModel.create({
            name: profile.displayName,
            email,
            provider: "google",
          });
        }

        // لو موجود → login عادي
        return done(null, user);

      } catch (err) {
        return done(err, null);
      }
    }
  )
);





