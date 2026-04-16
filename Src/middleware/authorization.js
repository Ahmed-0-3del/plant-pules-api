import { AppError } from "../utils/AppErorr.js";



export const allowTo = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      return next(new AppError("Not authorized", 403));
    }

    next();
  };
};





