import { generateOtp } from "../utils/generateOtp.js";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import User from "../models/authModel.js";
import bcrypt from "bcryptjs";

// REGISTER
export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { success: false, message: "User already exists" };
  }

  const hashed = await bcrypt.hash(password, 10);
  const otp = generateOtp();
  const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);
  
  const user = await User.create({
    name,
    email,
    password: hashed,
    otp,
    otpExpiry,
  });
  
  await sendEmail(
    email,
    "Your OTP Code",
    `<h2>OTP for login LexEye</h2> <p>Your OTP is ${otp}. This OTP is valid for 15 minutes.</p>`
  );

  return { success: true, message: "OTP sent successfully", userId: user._id };
};

// SIGN IN
export const signinUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) return { success: false, message: "User not found" };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { success: false, message: "Invalid credentials" };

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  return {
    success: true,
    message: "User logged in successfully",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  };
};

// VERIFY OTP
export const verifyUserOtp = async ({ email, otp }) => {
  const user = await User.findOne({ email });
  if (!user) return { success: false, message: "User not found" };

  if (user.otp !== otp) return { success: false, message: "Invalid OTP" };
  if (user.otpExpiry < Date.now()) return { success: false, message: "OTP expired" };

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  return {
    success: true,
    message: "Login successful",
    token,
    user: {
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    },
  };
};

// RESEND OTP
export const resendUserOtp = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return { success: false, message: "User not found" };

  const otp = generateOtp();
  const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();

  await sendEmail(
    email,
    "LexEye OTP",
    `<h2>Hello ${user.name}</h2> <p>Your new OTP is <b>${otp}</b>.</br> This OTP is valid for 15 minutes.</p>`
  );

  return { success: true, message: "New OTP sent successfully to email" };
};

// FORGOT PASSWORD (Send OTP for password reset)
export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    // For security, don't reveal if user exists or not
    return { success: true, message: "If the email exists, OTP will be sent" };
  }

  const otp = generateOtp();
  const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();

  await sendEmail(
    email,
    "Password Reset OTP - LexEye",
    `<h2>Password Reset Request</h2>
     <p>Hello ${user.name},</p>
     <p>Your password reset OTP is <b>${otp}</b>.</p>
     <p>This OTP is valid for 15 minutes.</p>`
  );

  return { success: true, message: "OTP sent successfully for password reset" };
};

// VERIFY PASSWORD RESET OTP
export const verifyPasswordResetOtp = async ({ email, otp }) => {
  const user = await User.findOne({ email });
  if (!user) return { success: false, message: "User not found" };

  if (user.otp !== otp) return { success: false, message: "Invalid OTP" };
  if (user.otpExpiry < Date.now()) return { success: false, message: "OTP expired" };

  // Generate a temporary token for password reset
  const resetToken = jwt.sign(
    { 
      id: user._id, 
      purpose: 'password_reset' 
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '15m' }
  );

  // Clear OTP after successful verification
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  return {
    success: true,
    message: "OTP verified successfully",
    resetToken,
    user: {
      id: user._id,
      email: user.email
    }
  };
};

// RESET PASSWORD
export const resetPassword = async (email, newPassword) => {
  const user = await User.findOne({ email });
  if (!user) return { success: false, message: "User not found" };

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  // Send confirmation email
  await sendEmail(
    email,
    "Password Reset Successful - LexEye",
    `<h2>Password Reset Successful</h2>
     <p>Hello ${user.name},</p>
     <p>Your password has been reset successfully.</p>
     <p>If you didn't request this change, please contact support immediately.</p>`
  );

  return { success: true, message: "Password reset successfully" };
};

// FIND USER
export const findUserById = async (id) => {
  return await User.findById(id);
};

// UPDATE PASSWORD (for authenticated users)
export const updatePassword = async (id, currentPassword, newPassword) => {
  const user = await User.findById(id);
  if (!user) return { success: false, message: "User not found" };

  // Verify current password
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) return { success: false, message: "Current password is incorrect" };

  // Hash and update new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return { success: true, message: "Password updated successfully" };
};