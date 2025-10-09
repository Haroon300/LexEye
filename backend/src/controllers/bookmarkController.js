import Bookmark from "../models/bookmarkModel.js";
import Law from "../models/lawModel.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

// ✅ Add a bookmark
export const addBookmark = asyncWrapper(async (req, res) => {
  
    const { lawId } = req.body;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!lawId) return res.status(400).json({ message: "Law ID is required" });

    // Check if law exists
    const law = await Law.findById(lawId);
    if (!law) return res.status(404).json({ message: "Law not found" });

    // Check if already bookmarked
    const exists = await Bookmark.findOne({ userId, lawId });
    if (exists) return res.status(400).json({ message: "Already bookmarked" });

    // Create new bookmark
    const bookmark = await Bookmark.create({ userId, lawId });
    res.status(201).json({
      success: true,
      message: "Bookmark added successfully",
      bookmark,
    });
  
});

// ✅ Get all bookmarks for a user
export const getBookmarks = asyncWrapper(async (req, res) => {
  
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const bookmarks = await Bookmark.find({ userId })
      .populate("lawId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookmarks.length,
      bookmarks,
    });
  
});

// ✅ Remove bookmark
export const removeBookmark = asyncWrapper(async (req, res) => {
  
    const { lawId } = req.params;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!lawId) return res.status(400).json({ message: "Law ID is required" });

    const deleted = await Bookmark.findOneAndDelete({ userId, lawId });

    if (!deleted)
      return res.status(404).json({ message: "Bookmark not found" });

    res.json({
      success: true,
      message: "Bookmark removed successfully",
    });
  
});
