import { asyncWrapper } from "../utils/asyncWrapper.js";
import User from "../models/authModel.js";

export const getProfile = asyncWrapper( async (req, res) => {
  return res.json(req.user); 
});


export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;

    if (req.file && req.file.path) {
      user.profileImage = req.file.path; 
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};