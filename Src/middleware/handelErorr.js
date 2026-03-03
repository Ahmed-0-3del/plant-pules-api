import { AppError } from "../utils/AppErorr.js";




export const handleError = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
        console.log("Error in handleError middleware:", err);
      // نحاول نقرأ رسالة الخطأ من Joi أو الخطأ العادي
      const message = err?.details?.[0]?.message || err?.message || "Unexpected Error";
      next(new AppError(message, 401));
    });
  };
};
