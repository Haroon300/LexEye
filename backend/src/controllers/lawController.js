import Law from "../models/lawModel.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import Fuse from "fuse.js";

/* ===============================
   ✅ CREATE LAW
================================= */
export const createLaw = asyncWrapper(async (req, res) => {
  const law = new Law(req.body);
  await law.save();
  res.status(201).json(law);
});

/* ===============================
   ✅ UPDATE LAW
================================= */
export const updateLaw = asyncWrapper(async (req, res) => {
  const law = await Law.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!law) return res.status(404).json({ error: "Law not found" });
  res.json(law);
});

/* ===============================
   ✅ DELETE LAW
================================= */
export const deleteLaw = asyncWrapper(async (req, res) => {
  const law = await Law.findByIdAndDelete(req.params.id);
  if (!law) return res.status(404).json({ error: "Law not found" });
  res.json({ message: "Law deleted" });
});

/* ===============================
   ✅ GET ALL LAWS (pagination + filters)
================================= */
export const getAllLaws = asyncWrapper(async (req, res) => {
  const { page = 1, pageSize = 10, keyword, category, sabCategory } = req.query;
  const pageNum = Number(page);
  const sizeNum = Number(pageSize);
  const skip = (pageNum - 1) * sizeNum;

  const filter = {};

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

  if (category)
    filter.category = { $regex: new RegExp("^" + category + "$", "i") };

  if (sabCategory)
    filter.sabCategory = { $regex: new RegExp("^" + sabCategory + "$", "i") };

  const laws = await Law.find(filter)
    .skip(skip)
    .limit(sizeNum)
    .sort({ createdAt: -1 })
    .lean();

  const count = await Law.countDocuments(filter);

  res.json({
    success: true,
    currentPage: pageNum,
    totalPages: Math.ceil(count / sizeNum),
    totalCount: count,
    count: laws.length,
    laws,
  });
});

/* ===============================
   ✅ GET SINGLE LAW
================================= */
export const getLawById = asyncWrapper(async (req, res) => {
  const law = await Law.findById(req.params.id).lean();
  if (!law) return res.status(404).json({ error: "Law not found" });
  res.json(law);
});

/* ===============================
   🔍 HYBRID SMART SEARCH
   (Natural sentence + ranking + fuzzy fallback)
================================= */
export const searchLaws = asyncWrapper(async (req, res) => {
  const { query, limit = 20 } = req.body;

  if (!query || query.trim().length === 0) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  const searchQuery = query.trim();
  const words = searchQuery.split(" ").filter((w) => w.length > 2);

  try {
    // --- Step 1: Atlas Search ---
    let atlasResults = await Law.aggregate([
      {
        $search: {
          index: "lawSearchIndex",
          compound: {
            should: [
              {
                text: {
                  query: words,
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
                  fuzzy: { maxEdits: 2, prefixLength: 2 }
                }
              },
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
      { $limit: parseInt(limit) },
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

    // Normalize Atlas score → 0–100
    atlasResults = atlasResults.map((item) => {
      const score = item.score ? Math.min(100, (item.score / 10) * 100) : 0;
      return { ...item, matchPercentage: Math.round(score) };
    });

    // --- Step 2: Fuse.js fallback ---
    let combined = [...atlasResults];

    if (!atlasResults || atlasResults.length < 5) {
      const allLaws = await Law.find().lean();
      const fuse = new Fuse(allLaws, {
        keys: [
          "lawTitle",
          "description",
          "legalConcept",
          "category",
          "sabCategory",
          "sectionOverview",
          "preventionSolutions",
          "jurisdiction"
        ],
        includeScore: true,
        threshold: 0.35,
        minMatchCharLength: 3
      });

      const fuseResults = fuse.search(searchQuery);

      const formatted = fuseResults.slice(0, limit).map((r) => ({
        ...r.item,
        matchPercentage: Math.round((1 - r.score) * 100) // Fuse score: lower = better
      }));

      // Merge + remove duplicates
      const unique = new Map();
      [...atlasResults, ...formatted].forEach((item) =>
        unique.set(item._id?.toString(), item)
      );

      combined = Array.from(unique.values());
    }

    // --- Step 3: Sort by match percentage (high → low) ---
    combined.sort((a, b) => b.matchPercentage - a.matchPercentage);

    if (!combined.length) {
      return res.status(404).json({ message: "No related laws found" });
    }

    // --- Step 4: Response ---
    res.status(200).json({
      success: true,
      total: combined.length,
      data: combined.slice(0, limit),
    });
  } catch (err) {
    console.error("❌ Search Error:", err);
    res.status(500).json({ error: "Server error while searching laws" });
  }
});



/* ===============================
   ✅ GET ALL CATEGORIES + SUBCATEGORIES
================================= */
export const getAllLawCategories = asyncWrapper(async (req, res) => {
  const categories = await Law.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $project: { _id: 0, category: "$_id", count: 1 } },
    { $sort: { category: 1 } },
  ]);

  const sabCategories = await Law.aggregate([
    { $group: { _id: "$sabCategory", count: { $sum: 1 } } },
    { $project: { _id: 0, sabCategory: "$_id", count: 1 } },
    { $sort: { sabCategory: 1 } },
  ]);

  res.status(200).json({
    success: true,
    categories,
    sabCategories,
  });
});

/* ===============================
   ✅ GET LAWS BY CATEGORY (with pagination)
================================= */
export const getLawsByCategory = asyncWrapper(async (req, res) => {
  let { category, sabCategory, page = 1, pageSize = 10 } = req.body;
  const pageNum = Number(page);
  const sizeNum = Number(pageSize);
  const skip = (pageNum - 1) * sizeNum;

  const filter = {};

  if (category) {
    category = category.replace(/-/g, " ");
    filter.category = { $regex: new RegExp("^" + category + "$", "i") };
  }

  if (sabCategory) {
    sabCategory = sabCategory.replace(/-/g, " ");
    filter.sabCategory = { $regex: new RegExp("^" + sabCategory + "$", "i") };
  }

  if (!category && !sabCategory)
    return res.status(400).json({ error: "Category or sabCategory is required" });

  const laws = await Law.find(filter)
    .skip(skip)
    .limit(sizeNum)
    .sort({ createdAt: -1 })
    .lean();

  const count = await Law.countDocuments(filter);

  if (laws.length === 0)
    return res.status(404).json({
      message: "No laws found in this category",
      success: true,
      currentPage: pageNum,
      totalPages: 0,
      totalCount: 0,
      count: 0,
      laws: [],
    });

  res.json({
    success: true,
    currentPage: pageNum,
    totalPages: Math.ceil(count / sizeNum),
    totalCount: count,
    count: laws.length,
    laws,
  });
});
