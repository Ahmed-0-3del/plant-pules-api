
import rateLimit from "express-rate-limit";

// limiter عام
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100, // 100 request بس
  message: {
    status: "fail",
    message: "Too many requests, please try again later",
  },
});


// for login
export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 دقايق
  max: 5, // 5 محاولات بس
  skipSuccessfulRequests: true,
  message: {
    status: "fail",
    message: "Too many login attempts, try again later",
  },
});





