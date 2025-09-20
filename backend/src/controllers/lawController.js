import Law from "../models/lawModel.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

// ✅ Create
export const createLaw = asyncWrapper(async (req, res) => {
  const law = new Law(req.body);
  await law.save();
  res.status(201).json(law);
});

// ✅ Read All (with optional pagination & search)
export const getAllLaws = asyncWrapper(async (req, res) => {
  const { page = 1, pageSize = 10, keyword } = req.query;
  const skip = (page - 1) * pageSize;

  const filter = keyword
    ? {
        $or: [
          { section: { $regex: keyword, $options: "i" } },
          { legalConcept: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { legalConsequence: { $regex: keyword, $options: "i" } },
          { preventionSolutions: { $regex: keyword, $options: "i" } },
        ],
      }
    : {};

  const laws = await Law.find(filter)
    .skip(skip)
    .limit(Number(pageSize))
    .sort({ createdAt: -1 });

  const count = await Law.countDocuments(filter);

  res.json({ laws, count });
});

// ✅ Read Single
export const getLawById = asyncWrapper(async (req, res) => {
  const law = await Law.findById(req.params.id).populate("relatedLaws");
  if (!law) return res.status(404).json({ error: "Law not found" });
  res.json(law);
});

// ✅ Update
export const updateLaw = asyncWrapper(async (req, res) => {
  const law = await Law.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!law) return res.status(404).json({ error: "Law not found" });
  res.json(law);
});

// ✅ Delete
export const deleteLaw = asyncWrapper(async (req, res) => {
  const law = await Law.findByIdAndDelete(req.params.id);
  if (!law) return res.status(404).json({ error: "Law not found" });
  res.json({ message: "Law deleted" });
});

// ✅ Get Categories with counts
export const getCategoriesWithCounts = asyncWrapper(async (req, res) => {
  const categories = await Law.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
  res.json(categories);
});

// 🔎 Search by keyword (full-text + regex fallback)
export const searchLaws = asyncWrapper(async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  try {
    // First try full-text search (requires text index)
    let results = await Law.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    // If no results, fallback to regex search
    if (!results.length) {
      results = await Law.find({
        $or: [
          { section: { $regex: query, $options: "i" } },
          { legalConcept: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { legalConsequence: { $regex: query, $options: "i" } },
          { preventionSolutions: { $regex: query, $options: "i" } },
        ],
      });
    }

    return res.json({
      success: true,
      count: results.length,
      results,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error during search",
      error: err.message,
    });
  }
});

// 📂 Get laws by category
export const getLawsByCategory = asyncWrapper(async (req, res) => {
  const { category } = req.params;
  const laws = await Law.find({ category });

  if (!laws.length) {
    return res.status(404).json({ error: "No laws found for this category" });
  }

  res.json(laws);
});
