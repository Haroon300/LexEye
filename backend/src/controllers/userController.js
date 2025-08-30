import User from "../models/userModel.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import cloudinary from "../utils/cloudinary.js";

export const getProfile = asyncWrapper( async (req, res) => {
  return res.json(req.user); // req.user is added by `protect` middleware
});

export const updateProfile = asyncWrapper( async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  // if file uploaded (profile image)
  if (req.file) {
    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "profiles",
    });
    user.profileImage = upload.secure_url;
  }

  await user.save();
  return res.json({ message: "Profile updated", user });
});