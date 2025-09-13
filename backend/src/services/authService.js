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

  let name = user.name;

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  return { success: true, message: "User logged in successfully", token ,name };
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
export const resendUserOtp = async ({ email }) => {
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

// FIND USER
export const findUserById = async (id) => {
  return await User.findById(id);
};

// UPDATE PASSWORD
export const updatePassword = async (id, password) => {
  const user = await User.findById(id);
  if (!user) return { success: false, message: "User not found" };

  const hashed = await bcrypt.hash(password, 10);
  user.password = hashed;
  await user.save();

  return { success: true, message: "Password updated successfully" };
};
