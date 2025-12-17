import ApiResponse from "../utils/api-response.js"
import ApiError from "../utils/api-error.js"
import asyncHandler from "../utils/async-handler.js"
import Owner from "../models/owner.model.js"
import { sendEmail,emailVerificationMailgenContent } from "../utils/mail.js"


const generateAccessAndRefreshToken =async (user_id)=>{
    try{
        const user=await Owner.findById(user_id);
        const accessToken=await user.generateAccessToken();
        const refreshToken=await user.generateRefreshToken();
        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false});
        return {accessToken, refreshToken};

    }catch(err)
    {
        throw new ApiError(500,"Something went wrong",[]);
    }
}

export const registerUser= asyncHandler(async (req,res)=>{
    const {ownername,email,password} = req.body;

    const existedUser=await Owner.findOne({
        $or :[{email},{ownername}]
    })

    if (existedUser) {
      throw new ApiError(400, 'User already exists in the data base', []);
    }
    
    const user = await Owner.create({
      ownername,
      email,
      password,
      isEmailVerified:false,
    });

    const { unhashedtoken, hashedToken, expire } = user.generateTemporaryToken();

    user.emailVerificationToken=hashedToken;
    user.emailVerificationExpiry=expire;

    await user.save({validateBeforeSave:false})

    // send mail todo i have to setup mail

    await sendEmail({
      email: user?.email,
      subject: 'To verify Email',
      mailgenContent: emailVerificationMailgenContent(
        user?.ownername,
        `${req.protocol}://${req.get('host')}/api/v1/users/verify-email/${unhashedtoken}`
      ),
    });

    const createdUser = await Owner.findById(user._id).select(
      '-password -refreshToken -emailVerificationToken -emailVerificationExpiry',
    );

    if(!createdUser)
    {
        throw new ApiError(500,"Something went wrong while registering user",[])
    }

    res.status(200).json(new ApiResponse(200,{user:createdUser,
        message:"user registered successfully"}))
})

export const login= asyncHandler(async (req,res)=>{
    const {email,password} =req.body;
    if(!email)
    {
        throw new ApiError(400,"Email is required");
    }

    const user=await Owner.findOne({email});

    if(!user)
    {
        throw new ApiError(400, 'Email is required');
    }
    
    const isPasswordValid = await user.comparePassword(password);

    if(!isPasswordValid)
    {
        throw new ApiError(400,"Password is invalid please check the password")
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await Owner.findById(user._id).select(
      '-password -refreshToken -emailVerificationToken -emailVerificationExpiry',
    );

    const options={
        httpOnly:true,
        secure:true
    }

    res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,{
        loggedInUser:loggedInUser,
        accessToken:accessToken,
        refreshToken:refreshToken
    },"UserLoggedin successfully"))

 })