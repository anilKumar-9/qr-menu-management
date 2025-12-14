import mongoose from 'mongoose';
import bcrypt from "bcrypt"

const ownerSchema = mongoose.Schema(
  {
    ownername: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      select:false
    },
    role: {
      type: String,
      enum: ['owner', 'admin'],
      default: 'owner',
    },
    // for authentication purpose

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
    },

    emailVerificationToken: {
      type: String,
    },

    emailVerificationExpiry: {
      type: Date,
    },
    forgotPasswordToken: {
      type: String,
    },

    forgotPasswordExpiry: {
      type: Date,
    },
  },
  { timestamps: true },
);


ownerSchema.pre("save",async function(next){
    if(!this.isModified("password"))
    {
        return next();
    }

    this.password= await bcrypt.hash(this.password,11);
    next();
})

ownerSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}