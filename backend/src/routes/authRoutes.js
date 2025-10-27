import { Router } from "express";
import { 
  registerUser, 
  loginUser, 
  verifyOtp, 
  resendOtp, 
  forgotPassword, 
  resetPassword 
} from "../controllers/authController.js";

const router = Router();

// Signup route
router.post("/signup", registerUser);
router.all("/signup", (req, res) =>
  res.status(405).json({ error: "Method Not Allowed" })
);

// Signin route
router.post("/signin", loginUser);
router.all("/signin", (req, res) =>
  res.status(405).json({ error: "Method Not Allowed" })
);

// Verify OTP route
router.post("/verify", verifyOtp);
router.all("/verify", (req, res) =>
  res.status(405).json({ error: "Method Not Allowed" })
);

// Resend OTP route
router.post("/resend-otp", resendOtp);
router.all("/resend-otp", (req, res) =>
  res.status(405).json({ error: "Method Not Allowed" })
);

// Forgot password route
router.post("/forgot-password", forgotPassword);
router.all("/forgot-password", (req, res) =>
  res.status(405).json({ error: "Method Not Allowed" })
);

// Reset password route - protected with verifyUser middleware
router.post("/reset-password", resetPassword);
router.all("/reset-password", (req, res) =>
  res.status(405).json({ error: "Method Not Allowed" })
);

export default router;