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

// ✅ Search
export const searchLaws = asyncWrapper(async (req, res) => {
  const { query, page = 1, limit = 10 } = req.body;

  if (!query || !query.trim()) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  const skip = (page - 1) * limit;
  
  // Split query into words for better search
  const searchWords = query.trim().toLowerCase().split(/\s+/).filter(word => word.length > 0);

  try {
    // --- MongoDB Atlas Search ---
    let results = await Law.aggregate([
      {
        $search: {
          index: "default",
          compound: {
            should: searchWords.map((word) => ({
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
        $addFields: { 
          score: { $meta: "searchScore" },
          // Add relevance scoring based on field importance
          relevanceScore: {
            $add: [
              { $cond: [{ $regexMatch: { input: "$lawTitle", regex: new RegExp(searchWords.join('|'), 'i') } }, 10, 0] },
              { $cond: [{ $regexMatch: { input: "$section", regex: new RegExp(searchWords.join('|'), 'i') } }, 8, 0] },
              { $cond: [{ $regexMatch: { input: "$legalConcept", regex: new RegExp(searchWords.join('|'), 'i') } }, 6, 0] },
              { $cond: [{ $regexMatch: { input: "$description", regex: new RegExp(searchWords.join('|'), 'i') } }, 4, 0] },
              { $cond: [{ $regexMatch: { input: "$category", regex: new RegExp(searchWords.join('|'), 'i') } }, 3, 0] },
            ]
          }
        },
      },
      { 
        $sort: { 
          relevanceScore: -1,
          score: -1 
        } 
      },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: parseInt(limit) },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    let data = results[0]?.data || [];
    let totalCount = results[0]?.totalCount?.[0]?.count || 0;

    // --- Fallback: Fuse.js if no Atlas Search results ---
    if (!data.length) {
      const allLaws = await Law.find().lean();

      const fuse = new Fuse(allLaws, {
        keys: [
          { name: "lawTitle", weight: 3 },
          { name: "section", weight: 3 },
          { name: "legalConcept", weight: 2 },
          { name: "description", weight: 2 },
          { name: "category", weight: 1.5 },
          { name: "sabCategory", weight: 1.5 },
          { name: "sectionOverview", weight: 1 },
          { name: "legalConsequence", weight: 1 },
          { name: "preventionSolutions", weight: 1 },
          { name: "stepByStepGuide", weight: 1 },
          { name: "jurisdiction", weight: 0.5 },
        ],
        threshold: 0.3, // Lower threshold for more results
        distance: 100,
        includeScore: true,
        ignoreLocation: true, // Search in entire strings
        minMatchCharLength: 2, // Match even short words
      });

      const allResults = fuse.search(query)
        .sort((a, b) => a.score - b.score)
        .map((r) => ({ 
          ...r.item, 
          score: 1 - r.score,
          // Add relevance highlights for frontend
          searchHighlights: getSearchHighlights(r.item, query)
        }));

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
  } catch (error) {
    // If Atlas search fails, use Fuse.js directly
    console.log("Atlas search failed, using Fuse.js fallback:", error.message);
    
    const allLaws = await Law.find().lean();
    const fuse = new Fuse(allLaws, {
      keys: [
        { name: "lawTitle", weight: 3 },
        { name: "section", weight: 3 },
        { name: "legalConcept", weight: 2 },
        { name: "description", weight: 2 },
        { name: "category", weight: 1.5 },
        { name: "sabCategory", weight: 1.5 },
        { name: "sectionOverview", weight: 1 },
        { name: "legalConsequence", weight: 1 },
        { name: "preventionSolutions", weight: 1 },
        { name: "stepByStepGuide", weight: 1 },
        { name: "jurisdiction", weight: 0.5 },
      ],
      threshold: 0.3,
      distance: 100,
      includeScore: true,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });

    const allResults = fuse.search(query)
      .sort((a, b) => a.score - b.score)
      .map((r) => ({ 
        ...r.item, 
        score: 1 - r.score,
        searchHighlights: getSearchHighlights(r.item, query)
      }));

    const totalCount = allResults.length;
    const data = allResults.slice(skip, skip + parseInt(limit));

    return res.json({
      success: true,
      count: data.length,
      totalCount,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / limit),
      results: data,
    });
  }
});

// Helper function to generate search highlights
function getSearchHighlights(law, query) {
  const highlights = {};
  const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2);
  
  const fieldsToCheck = [
    'lawTitle', 'section', 'legalConcept', 'description', 
    'category', 'sabCategory', 'sectionOverview'
  ];
  
  fieldsToCheck.forEach(field => {
    if (law[field]) {
      const fieldValue = law[field].toLowerCase();
      const hasMatch = searchTerms.some(term => fieldValue.includes(term));
      if (hasMatch) {
        highlights[field] = true;
      }
    }
  });
  
  return highlights;
}

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