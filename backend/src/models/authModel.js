import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: "" },
  otp: { type: String },
  otpExpiry: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Check if model already exists before creating
const User = mongoose.models.User || mongoose.model("User", authSchema);

export default User;
