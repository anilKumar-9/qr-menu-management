import ApiResponse from '../utils/api-response.js';
import ApiError from '../utils/api-error.js';
import asyncHandler from '../utils/async-handler.js';
import Owner from '../models/owner.model.js';
import {
  sendEmail,
  emailVerificationMailgenContent,
  passwordVerificationMailgenContent,
} from '../utils/mail.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';



const generateAccessAndRefreshToken = async (user_id) => {
  try {
    const user = await Owner.findById(user_id);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, 'Failed to generate authentication tokens');
  }
};



const registerUser = asyncHandler(async (req, res) => {
  const { ownername, email, password } = req.body;

  const existedUser = await Owner.findOne({
    $or: [{ email }, { ownername }],
  });

  if (existedUser) {
    throw new ApiError(409, 'User already exists');
  }

  const user = await Owner.create({
    ownername,
    email,
    password,
    isEmailVerified: false,
  });

  const { unhashedtoken, hashedToken, expire } = user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = expire;
  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user.email,
    subject: 'Verify your email',
    mailgenContent: emailVerificationMailgenContent(
      user.ownername,
      `${req.protocol}://${req.get('host')}/api/v1/users/verify-email/${unhashedtoken}`,
    ),
  });

  const createdUser = await Owner.findById(user._id).select(
    '-password -refreshToken -emailVerificationToken -emailVerificationExpiry',
  );

  if (!createdUser) {
    throw new ApiError(500, 'User registration failed');
  }

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: createdUser },
        'Registration successful. Please verify your email.',
      ),
    );
});



const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const user = await Owner.findOne({ email });

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }
  
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  const loggedInUser = await Owner.findById(user._id).select(
    '-password -refreshToken -emailVerificationToken -emailVerificationExpiry',
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          loggedInUser,
          accessToken,
          refreshToken,
        },
        'Login successful',
      ),
    );
});



const logout = asyncHandler(async (req, res) => {
  await Owner.findByIdAndUpdate(req.user._id, {
    refreshToken: '',
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {}, 'Logout successful'));
});



const getUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, req.user, 'User fetched successfully'));
});



const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    throw new ApiError(400, 'Verification token is missing');
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await Owner.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, 'Invalid or expired verification token');
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;
  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { isEmailVerified: true },
        'Email verified successfully',
      ),
    );
});


const resendEmailVerification = asyncHandler(async (req, res) => {
  const user = await Owner.findById(req.user.id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.isEmailVerified) {
    throw new ApiError(409, 'Email is already verified');
  }

  const { unhashedtoken, hashedToken, expire } = user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = expire;
  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user.email,
    subject: 'Verify your email',
    mailgenContent: emailVerificationMailgenContent(
      user.ownername,
      `${req.protocol}://${req.get('host')}/api/v1/users/verify-email/${unhashedtoken}`,
    ),
  });

  res
    .status(200)
    .json(new ApiResponse(200, {}, 'Verification email sent successfully'));
});


const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, 'Refresh token is missing');
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const user = await Owner.findById(decodedToken.id);

    if (!user || user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user.id,
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json(new ApiResponse(200, {}, 'Access token refreshed successfully'));
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }
});



const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, 'Email is required');
  }

  const user = await Owner.findOne({ email });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const { unhashedtoken, hashedToken, expire } = user.generateTemporaryToken();

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = expire;
  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user.email,
    subject: 'Reset your password',
    mailgenContent: passwordVerificationMailgenContent(
      user.ownername,
      `${process.env.CHANGE_PASSWORD_URL}/${unhashedtoken}`,
    ),
  });

  res
    .status(200)
    .json(new ApiResponse(200, {}, 'Password reset email sent successfully'));
});



const resetForgotPassword = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;
  const { newPassword } = req.body;

  const hashedToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  const user = await Owner.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, 'Invalid or expired password reset token');
  }

  user.password = newPassword;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  await user.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, {}, 'Password reset successfully'));
});


const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await Owner.findById(req.user.id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const isPasswordValidate = await user.comparePassword(
    oldPassword,
    newPassword,
  );

  if (!isPasswordValidate) {
    throw new ApiError(401, 'Current password is incorrect');
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, {}, 'Password changed successfully'));
});



export {
  registerUser,
  login,
  logout,
  getUser,
  verifyEmail,
  resendEmailVerification,
  refreshAccessToken,
  forgotPassword,
  resetForgotPassword,
  changeCurrentPassword,
};
