
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
        required: true,
    },
    changePasswordAt: Date,
    isVerified: {
         type: Boolean,
        default: false
     },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },



},{ timestamps: true })


UserSchema.pre("save", function () {
  if (this.isModified("password") || this.isNew) {
    // تأكد من أن كلمة المرور موجودة قبل التشفير
    if (!this.password) throw new Error("Password is required");
    this.password = bcrypt.hashSync(this.password, 10); // 10 هو عدد الـ salt rounds
  }
});

export const UserModel = mongoose.model("User", UserSchema);



