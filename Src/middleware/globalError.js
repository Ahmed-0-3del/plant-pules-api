
import { AppError } from "../utils/AppErorr.js";

export const globalError = (err, req, res, next) => {

  let error = { ...err };
  error.message = err.message;

  //  MongoDB Duplicate Key
  if (err.code === 11000) {
    error = new AppError("Email already exists", 409);
  }

  //  JWT
  if (err.name === "JsonWebTokenError") {
    error = new AppError("Invalid token", 401);
  }

  if (err.name === "TokenExpiredError") {
    error = new AppError("Token expired", 401);
  }

  //  Mongoose Validation
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(val => val.message);
    error = new AppError(messages.join(", "), 400);
  }

  // default
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  //  رد نظيف جدًا
  return res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};