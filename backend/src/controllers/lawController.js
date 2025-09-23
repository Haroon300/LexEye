import Law from "../models/lawModel.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import Fuse from "fuse.js";


// ✅ Create
export const createLaw = asyncWrapper(async (req, res) => {
  const law = new Law(req.body);
  await law.save();
  res.status(201).json(law);
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

// ✅ Read All
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
    .sort({ createdAt: -1 })
    .lean(); // 🔥 plain objects

  const count = await Law.countDocuments(filter);

  res.json({ laws, count });
});

// ✅ Read Single
export const getLawById = asyncWrapper(async (req, res) => {
  const law = await Law.findById(req.params.id).populate("relatedLaws").lean(); // 🔥
  if (!law) return res.status(404).json({ error: "Law not found" });
  res.json(law);
});

// ✅ Search
export const searchLaws = asyncWrapper(async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  try {
    // --- Atlas Search ---
    let results = await Law.aggregate([
      {
        $search: {
          index: "default",
          text: {
            query: query,
            path: [
              "section",
              "legalConcept",
              "description",
              "legalConsequence",
              "preventionSolutions",
            ],
            fuzzy: {
              maxEdits: 2,
              prefixLength: 2,
            },
          },
        },
      },
      {
        $addFields: { score: { $meta: "searchScore" } },
      },
      { $sort: { score: -1 } },
      { $limit: 20 },
    ]);

    // --- Fallback Fuse.js ---
    if (!results.length) {
      const allLaws = await Law.find().lean(); // 🔥
      const fuse = new Fuse(allLaws, {
        keys: [
          "section",
          "legalConcept",
          "description",
          "legalConsequence",
          "preventionSolutions",
        ],
        threshold: 0.4,
        includeScore: true,
      });

      results = fuse.search(query)
        .sort((a, b) => a.score - b.score)
        .slice(0, 20)
        .map((r) => ({ ...r.item, score: 1 - r.score }));
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
