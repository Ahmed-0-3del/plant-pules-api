
import Joi from "joi";

// signup validation ==> body
export const signupSchema = Joi.object({
  
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name must be at most 30 characters",
      "any.required": "Name is required",
    }),


email: Joi.string()
     .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),

   password: Joi.string()
    .min(6)
    .max(20)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password must be less than 20 characters",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref("password")) 
    .required()
    .messages({
      "any.only": "Confirm password must match password",
      "any.required": "Confirm password is required",
    }),

    gender: Joi.string().valid("male", "female").required()

});


  

// signin validation (BODY)
export const signinSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),

  password: Joi.string().required(),
});

// image validation ===> file
export const imageSchema = Joi.object({
  mimetype: Joi.string()
    .valid("image/jpeg", "image/png", "image/jpg")
    .required(),

  size: Joi.number().max(5 * 1024 * 1024).required(), // 5MB
});











// // signup validation
// export const signupSchema = Joi.object({
//   name: Joi.string()
//     .min(3)
//     .max(30)
//     .required()
//     .messages({
//       "string.base": "Name must be a string",
//       "string.empty": "Name is required",
//       "string.min": "Name must be at least 3 characters",
//       "string.max": "Name must be at most 30 characters",
//       "any.required": "Name is required",
//     }),

//   email: Joi.string()
//     .email({ tlds: { allow: false } })
//     .required()
//     .messages({
//       "string.email": "Please enter a valid email",
//       "string.empty": "Email is required",
//       "any.required": "Email is required",
//     }),

//   password: Joi.string()
//     .min(6)
//     .max(20)
//     .required()
//     .messages({
//       "string.min": "Password must be at least 6 characters",
//       "string.max": "Password must be less than 20 characters",
//       "string.empty": "Password is required",
//       "any.required": "Password is required",
//     }),

//   confirmPassword: Joi.string()
//     .valid(Joi.ref("password")) 
//     .required()
//     .messages({
//       "any.only": "Confirm password must match password",
//       "any.required": "Confirm password is required",
//     }),
// });

// // signin validation
// export const signinSchema = Joi.object({
//   email: Joi.string()
//     .email({ tlds: { allow: false } })
//     .required()
//     .messages({
//       "string.email": "Invalid email format",
//       "any.required": "Email is required",
//     }),

//   password: Joi.string()
//     .required()
//     .messages({
//       "string.empty": "Password is required",
//       "any.required": "Password is required",
//     }),
// });