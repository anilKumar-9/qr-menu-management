import mongoose from 'mongoose';
import bcrypt from "bcrypt"
import crypto from "crypto"
import jwt from "jsonwebtoken"

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


ownerSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 11);
});


ownerSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

ownerSchema.methods.generateTemporaryToken= function(){

  const unhashedtoken =crypto.randomBytes(32).toString('hex');


  const hashedToken = crypto
    .createHash('sha256')
    .update(unhashedtoken)
    .digest('hex');

  const expire=Date.now()+10*60*1000;

  return {unhashedtoken,hashedToken,expire};
}

ownerSchema.methods.generateAccessToken= async function(){
    return jwt.sign(
      {
        id: this._id,
        ownername: this.ownername,
        email: this.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
    );
}

ownerSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
  );
};



const Owner=mongoose.model("Owner",ownerSchema);

export default Owner;