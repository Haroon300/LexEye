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
  const words = searchQuery.split(" ").filter((w) => w.length > 2); // split sentence

  try {
    // --- Step 1: Atlas Search (for speed + accuracy) ---
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

    // --- Step 2: Fallback (Fuse.js local fuzzy match if Atlas fails or partial match needed) ---
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
        threshold: 0.35, // smaller = stricter
        includeScore: true,
        minMatchCharLength: 3,
      });

      const fuseResults = fuse.search(searchQuery);
      const formatted = fuseResults.slice(0, limit).map((r) => r.item);

      // merge Atlas + Fuse results (unique by _id)
      const combined = [
        ...atlasResults,
        ...formatted.filter(
          (f) => !atlasResults.some((a) => a._id?.toString() === f._id?.toString())
        ),
      ];

      if (combined.length === 0) {
        return res.status(404).json({ message: "No related laws found" });
      }

      return res.status(200).json({
        source: "atlas+fuse",
        total: combined.length,
        data: combined.slice(0, limit),
      });
    }

    // --- Step 3: If Atlas had good results, just return them ---
    res.status(200).json({
      source: "atlas",
      total: atlasResults.length,
      data: atlasResults,
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
