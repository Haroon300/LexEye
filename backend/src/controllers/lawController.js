import Law from "../models/lawModel.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

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

  if (!query || query.trim().length === 0)
    return res.status(400).json({ error: "Keyword is required" });

  const searchQuery = query.trim().toLowerCase();
  const words = searchQuery.split(/\s+/).filter((w) => w.length > 2);

  // --- Local keyword-based relevance search ---
  const keywordConditions = words.map((word) => ({
    $or: [
      { lawTitle: { $regex: word, $options: "i" } },
      { section: { $regex: word, $options: "i" } },
      { legalConcept: { $regex: word, $options: "i" } },
      { description: { $regex: word, $options: "i" } },
      { legalConsequence: { $regex: word, $options: "i" } },
      { preventionSolutions: { $regex: word, $options: "i" } },
      { sectionOverview: { $regex: word, $options: "i" } },
      { stepByStepGuide: { $regex: word, $options: "i" } },
      { jurisdiction: { $regex: word, $options: "i" } },
      { category: { $regex: word, $options: "i" } },
      { sabCategory: { $regex: word, $options: "i" } },
    ],
  }));

  const results = await Law.aggregate([
    { $match: { $and: keywordConditions } },
    {
      $addFields: {
        matchScore: {
          $add: words.map((word) => ({
            $cond: [
              {
                $regexMatch: {
                  input: {
                    $concat: [
                      "$lawTitle", " ",
                      "$section", " ",
                      "$legalConcept", " ",
                      "$description", " ",
                      "$sectionOverview", " ",
                      "$category", " ",
                      "$sabCategory"
                    ],
                  },
                  regex: word,
                  options: "i",
                },
              },
              1,
              0,
            ],
          })),
        },
      },
    },
    { $sort: { matchScore: -1, createdAt: -1 } },
    { $limit: parseInt(limit) },
    {
      $project: {
        lawTitle: 1,
        category: 1,
        sabCategory: 1,
        description: 1,
        section: 1,
        legalConcept: 1,
        jurisdiction: 1,
        matchScore: 1,
      },
    },
  ]);

  // ✅ If local search found results — return
  if (results.length > 0) {
    return res.json({
      source: "local",
      total: results.length,
      data: results,
    });
  }

  // --- 🔁 Fallback: Atlas Search (fuzzy spelling correction) ---
  try {
    const atlasResults = await Law.aggregate([
      {
        $search: {
          index: "lawSearchIndex", // 🔍 Must match your Atlas index name
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
              "jurisdiction",
            ],
            fuzzy: {
              maxEdits: 2,
              prefixLength: 2,
            },
          },
        },
      },
      { $limit: parseInt(limit) },
      {
        $project: {
          lawTitle: 1,
          category: 1,
          sabCategory: 1,
          description: 1,
          section: 1,
          legalConcept: 1,
          jurisdiction: 1,
          score: { $meta: "searchScore" },
        },
      },
    ]);

    if (!atlasResults || atlasResults.length === 0) {
      return res.status(404).json({ message: "No related laws found" });
    }

    res.status(200).json({
      source: "atlas-fuzzy",
      total: atlasResults.length,
      data: atlasResults,
    });
  } catch (err) {
    console.error("❌ Atlas Search Error:", err);
    res.status(500).json({ error: "Error running fuzzy search" });
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
