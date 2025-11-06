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

// ✅ Read All (with pagination, keyword search, and category filter)
export const getAllLaws = asyncWrapper(async (req, res) => {
  const { page = 1, pageSize = 10, keyword, category, sabCategory } = req.query;
  const skip = (page - 1) * pageSize;

  // --- Filter ---
  const filter = {};

  // keyword filter
  if (keyword) {
    filter.$or = [
      { lawTitle: { $regex: keyword, $options: "i" } },
      { section: { $regex: keyword, $options: "i" } },
      { legalConcept: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { legalConsequence: { $regex: keyword, $options: "i" } },
      { preventionSolutions: { $regex: keyword, $options: "i" } },
      { sectionOverview: { $regex: keyword, $options: "i" } },
      { stepByStepGuide: { $regex: keyword, $options: "i" } },
      { jurisdiction: { $regex: keyword, $options: "i" } },
    ];
  }

  // category filter
  if (category) {
    filter.category = { $regex: new RegExp("^" + category + "$", "i") };
  }

  // sabCategory filter
  if (sabCategory) {
    filter.sabCategory = { $regex: new RegExp("^" + sabCategory + "$", "i") };
  }

  // --- Fetch Laws ---
  const laws = await Law.find(filter)
    .skip(skip)
    .limit(Number(pageSize))
    .sort({ createdAt: -1 })
    .lean();

  const count = await Law.countDocuments(filter);

  res.json({
    success: true,
    currentPage: Number(page),
    totalPages: Math.ceil(count / pageSize),
    totalCount: count,
    count: laws.length,
    laws,
  });
});

// ✅ Read Single
export const getLawById = asyncWrapper(async (req, res) => {
  const law = await Law.findById(req.params.id).lean();
  if (!law) return res.status(404).json({ error: "Law not found" });
  res.json(law);
});

// ✅ Enhanced Search (Atlas + Fuzzy + Regex fallback)
import Law from "../models/lawModel.js";
import asyncWrapper from "../middleware/asyncWrapper.js";

export const searchLaws = asyncWrapper(async (req, res) => {
  const { query, limit = 20 } = req.body;

  // --- Empty input check ---
  if (!query || query.trim().length === 0) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  const searchQuery = query.trim();

  try {
    const results = await Law.aggregate([
      {
        $search: {
          index: "lawSearchIndex", // 🔍 your Atlas Search Index name
          compound: {
            should: [
              // --- Fuzzy text search (handles misspellings like 'harasment') ---
              {
                text: {
                  query: searchQuery,
                  path: [
                    "lawTitle",
                    "section",
                    "legalConcept",
                    "description",
                    "category",
                    "sabCategory",
                    "sectionOverview",
                    "legalConsequence",
                    "preventionSolutions",
                    "stepByStepGuide",
                    "jurisdiction"
                  ],
                  fuzzy: {
                    maxEdits: 2,       // allow up to 2 letter mistakes
                    prefixLength: 2    // first 2 letters must match
                  }
                }
              },
              // --- Wildcard search (matches partial or contained words) ---
              {
                wildcard: {
                  query: `*${searchQuery}*`,
                  path: [
                    "lawTitle",
                    "legalConcept",
                    "description",
                    "sectionOverview",
                    "category",
                    "sabCategory"
                  ],
                  allowAnalyzedField: true
                }
              }
            ]
          }
        }
      },
      // --- Optional: Limit results ---
      { $limit: parseInt(limit) },

      // --- Project only useful fields + search score ---
      {
        $project: {
          lawTitle: 1,
          section: 1,
          legalConcept: 1,
          description: 1,
          category: 1,
          sabCategory: 1,
          score: { $meta: "searchScore" }
        }
      }
    ]);

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No related laws found" });
    }

    res.status(200).json({
      total: results.length,
      data: results
    });
  } catch (err) {
    console.error("❌ Search Error:", err);
    res.status(500).json({ error: "Server error while searching laws" });
  }
});



// ✅ Get all categories
export const getAllLawCategories = asyncWrapper(async (req, res) => {
  const categories = await Law.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $project: { _id: 0, category: "$_id", count: 1 } },
    { $sort: { category: 1 } },
  ]);

  // Get all sabCategories as well
  const sabCategories = await Law.aggregate([
    { $group: { _id: "$sabCategory", count: { $sum: 1 } } },
    { $project: { _id: 0, sabCategory: "$_id", count: 1 } },
    { $sort: { sabCategory: 1 } },
  ]);

  res.status(200).json({ 
    success: true, 
    categories,
    sabCategories 
  });
});

// ✅ Get laws by category (POST) - WITH PAGINATION
export const getLawsByCategory = asyncWrapper(async (req, res) => {
  let { category, sabCategory, page = 1, pageSize = 10 } = req.body;
  
  const skip = (page - 1) * pageSize;
  const filter = {};

  if (category) {
    category = category.replace(/-/g, " ");
    filter.category = { $regex: new RegExp("^" + category + "$", "i") };
  }

  if (sabCategory) {
    sabCategory = sabCategory.replace(/-/g, " ");
    filter.sabCategory = { $regex: new RegExp("^" + sabCategory + "$", "i") };
  }

  if (!category && !sabCategory) {
    return res.status(400).json({ error: "Category or sabCategory is required" });
  }

  const laws = await Law.find(filter)
    .skip(skip)
    .limit(Number(pageSize))
    .sort({ createdAt: -1 })
    .lean();

  const count = await Law.countDocuments(filter);

  if (laws.length === 0) {
    return res.status(404).json({ 
      message: "No laws found in this category",
      success: true,
      currentPage: Number(page),
      totalPages: 0,
      totalCount: 0,
      count: 0,
      laws: []
    });
  }

  res.json({
    success: true,
    currentPage: Number(page),
    totalPages: Math.ceil(count / pageSize),
    totalCount: count,
    count: laws.length,
    laws,
  });
});