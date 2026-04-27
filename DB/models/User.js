
import mongoose from "mongoose";
import bcrypt from 'bcrypt';


const UserSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: function(){
          return this.provider === "local";
        },
        select: false,
    },
    confirmPassword:{
      type:String,
    },

  provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: String,


    changePasswordAt: Date,
    isVerified: {
         type: Boolean,
        default: false
     },
    resetCode: {
        type: String
    },
    resetCodeExpire: {
    type: Date
    },
    passwordResetVerified:{
    type:Boolean,
    default:false
  },

  role: {
  type: String,
  enum: ["user", "admin"],
  default: "user"
},

profileImage: {
  type: String,
  default: ""
},

gender: {
  type: String,
  enum: ["male", "female"],
  default: "male"
}
  


},{ timestamps: true })


UserSchema.pre("save", function () {
  if ((this.isModified("password") || this.isNew) && this.password) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
});


export const UserModel = mongoose.model("User", UserSchema);



