import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import  { connDB } from './DB/dbConnection.js';
import authRoutes from './Src/modules/auth/routes/auth.routes.js';
import scanRoutes from './Src/modules/scan/routes/scan.routes.js';
import forgetPassword from "./Src/modules/changePassword/routes/forgetPassword.routes.js";
import verifyCode from "./Src/modules/changePassword/routes/verifyCode.routes.js";
import changePassword from "./Src/modules/changePassword/routes/resetPassword.routes.js";
import passport from "passport";
import './Src/config/passport.js'
import { globalError } from "./Src/middleware/globalError.js";
import { globalLimiter } from "./Src/middleware/rateLimit.js";
import userRoutes from "./Src/modules/auth/routes/profile.routes.js";
import contactRoutes from "./Src/modules/contact/routes/contact.routes.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(globalLimiter)

app.use(async (req, res, next) => {
  await connDB();
  next();
});

app.use(passport.initialize());
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/scan",scanRoutes)
app.use("/api/v1/password",forgetPassword)
app.use("/api/v1/password",verifyCode)
app.use("/api/v1/password",changePassword)
app.use("/api/v1/contact",contactRoutes)




app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on port port ${port}`);
});

app.use(globalError);


