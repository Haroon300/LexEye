import { registerSchema, loginSchema } from "../validations/authValidation.js";
import * as AuthService from "../services/authService.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

// ✅ Register User
export const registerUser = asyncWrapper(async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const result = await AuthService.registerUser(req.body);
  return res.status(201).json(result);
});

// ✅ Login User
export const loginUser = asyncWrapper(async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const result = await AuthService.signinUser(req.body); // ✅ use from AuthService for consistency
  return res.json(result);
});

// ✅ Verify OTP
export const verifyOtp = asyncWrapper(async (req, res) => {
  const result = await AuthService.verifyUserOtp(req.body);
  return res.json(result);
});

// ✅ Resend OTP
export const resendOtp = asyncWrapper(async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const result = await AuthService.resendUserOtp(email);
  return res.json(result);
});

// ✅ Forgot Password
export const forgotPassword = asyncWrapper(async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const result = await AuthService.forgotPassword(email);
  return res.json(result);
});

// ✅ Reset Password
export const resetPassword = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const result = await AuthService.resetPassword(email, password);
  return res.json(result);
});