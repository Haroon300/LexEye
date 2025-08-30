import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  profileImage: {
    type: String,
    default: "", // URL from Cloudinary
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Fix: Avoid OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;