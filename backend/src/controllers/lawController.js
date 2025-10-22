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
  const { page = 1, pageSize = 10, keyword, category } = req.query;
  const skip = (page - 1) * pageSize;

  // --- Filter ---
  const filter = {};

  // keyword filter
  if (keyword) {
    filter.$or = [
      { section: { $regex: keyword, $options: "i" } },
      { legalConcept: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { legalConsequence: { $regex: keyword, $options: "i" } },
      { preventionSolutions: { $regex: keyword, $options: "i" } },
    ];
  }

  // category filter
  if (category) {
    filter.category = category;
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
    count,
    laws,
  });
});


// ✅ Read Single
export const getLawById = asyncWrapper(async (req, res) => {
  const law = await Law.findById(req.params.id).populate("relatedLaws").lean(); // 🔥
  if (!law) return res.status(404).json({ error: "Law not found" });
  res.json(law);
});

// ✅ Search

export const searchLaws = asyncWrapper(async (req, res) => {
  const { query, page = 1, limit = 10 } = req.body; // default page=1, limit=10

  if (!query || !query.trim()) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  const skip = (page - 1) * limit;

  // --- Break the input into words ---
  const words = query.split(" ").filter((w) => w.length > 2);

  // --- MongoDB Atlas Search ---
  let results = await Law.aggregate([
    {
      $search: {
        index: "default",
        compound: {
          should: words.map((word) => ({
            text: {
              query: word,
              path: [
                "lawTitle",
                "section",
                "category",
                "sabCategory",
                "jurisdiction",
                "sectionOverview",
                "legalConcept",
                "description",
                "legalConsequence",
                "preventionSolutions",
                "stepByStepGuide",
              ],
              fuzzy: {
                maxEdits: 2,
                prefixLength: 1,
              },
            },
          })),
        },
      },
    },
    {
      $addFields: { score: { $meta: "searchScore" } },
    },
    { $sort: { score: -1 } },
    {
      $facet: {
        data: [
          { $skip: skip },
          { $limit: parseInt(limit) },
          {
            $lookup: {
              from: "laws",
              localField: "relatedLaws",
              foreignField: "_id",
              as: "relatedLaws",
            },
          },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ]);

  let data = results[0]?.data || [];
  let totalCount = results[0]?.totalCount?.[0]?.count || 0;

  // --- Fallback: Fuse.js if no Atlas Search results ---
  if (!data.length) {
    const allLaws = await Law.find().populate("relatedLaws").lean();

    const fuse = new Fuse(allLaws, {
      keys: [
        "lawTitle",
        "section",
        "category",
        "sabCategory",
        "jurisdiction",
        "sectionOverview",
        "legalConcept",
        "description",
        "legalConsequence",
        "preventionSolutions",
        "stepByStepGuide",
      ],
      threshold: 0.4,
      distance: 200,
      includeScore: true,
    });

    const allResults = fuse.search(query)
      .sort((a, b) => a.score - b.score)
      .map((r) => ({ ...r.item, score: 1 - r.score }));

    totalCount = allResults.length;
    data = allResults.slice(skip, skip + parseInt(limit));
  }

  return res.json({
    success: true,
    count: data.length,
    totalCount,
    currentPage: parseInt(page),
    totalPages: Math.ceil(totalCount / limit),
    results: data,
  });
});





// ✅ Get all categories
export const getAllLawCategories = asyncWrapper(async (req, res) => {
  
    const categories = await Law.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { _id: 0, category: "$_id", count: 1 } },
      { $sort: { category: 1 } },
    ]);

    res.status(200).json({ success: true, categories });
  
});

// getLawsByCategory (POST)
export const getLawsByCategory = asyncWrapper(async (req, res) => {
  
    let { category } = req.body;

    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    // Handle slug-like names (property-law → Property Law)
    category = category.replace(/-/g, " ");

    const laws = await Law.find({
      category: { $regex: new RegExp("^" + category + "$", "i") },
    });

    if (laws.length === 0) {
      return res.status(404).json({ message: "No laws found in this category" });
    }

    res.json({ success: true, laws });
  
});
