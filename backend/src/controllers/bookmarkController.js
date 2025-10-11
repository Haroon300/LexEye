import Bookmark from "../models/bookmarkModel.js";
import Law from "../models/lawModel.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

// ✅ Add bookmark
export const addBookmark = asyncWrapper(async (req, res) => {
  const { lawId } = req.body;
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  if (!lawId) return res.status(400).json({ message: "Law ID is required" });

  // Check if law exists
  const law = await Law.findById(lawId);
  if (!law) return res.status(404).json({ message: "Law not found" });

  // Get or create user bookmark document
  let bookmarkDoc = await Bookmark.findOne({ userId });
  if (!bookmarkDoc) {
    bookmarkDoc = await Bookmark.create({ userId, bookmarks: [] });
  }

  // Check if already bookmarked
  const already = bookmarkDoc.bookmarks.some((b) => b._id === lawId);
  if (already)
    return res.status(400).json({ message: "Already bookmarked" });

  // Add new law details
  bookmarkDoc.bookmarks.push({
    _id: law._id.toString(),
    section: law.section,
    legalConcept: law.legalConcept,
    description: law.description,
    legalConsequence: law.legalConsequence,
    preventionSolutions: law.preventionSolutions,
  });

  await bookmarkDoc.save();

  res.status(201).json({
    success: true,
    message: "Bookmark added successfully",
    bookmark: bookmarkDoc,
  });
});

// ✅ Get all bookmarks for a user
export const getBookmarks = asyncWrapper(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const bookmarks = await Bookmark.findOne({ userId });
  res.json({
    success: true,
    bookmarks: bookmarks ? bookmarks.bookmarks : [],
  });
});

// ✅ Remove bookmark
export const removeBookmark = asyncWrapper(async (req, res) => {
  const { lawId } = req.params;
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  if (!lawId) return res.status(400).json({ message: "Law ID is required" });

  const bookmarkDoc = await Bookmark.findOne({ userId });
  if (!bookmarkDoc)
    return res.status(404).json({ message: "No bookmarks found" });

  const before = bookmarkDoc.bookmarks.length;
  bookmarkDoc.bookmarks = bookmarkDoc.bookmarks.filter((b) => b._id !== lawId);

  if (bookmarkDoc.bookmarks.length === before)
    return res.status(404).json({ message: "Bookmark not found" });

  await bookmarkDoc.save();

  res.json({
    success: true,
    message: "Bookmark removed successfully",
  });
});
