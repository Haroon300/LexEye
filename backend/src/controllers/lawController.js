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

// ✅ Enhanced Search
export const searchLaws = asyncWrapper(async (req, res) => {
  const { query, page = 1, limit = 10 } = req.body;

  if (!query || !query.trim()) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  const skip = (page - 1) * limit;
  const searchQuery = query.trim().toLowerCase();

  try {
    // First, try a simple regex search as primary approach
    const searchRegex = new RegExp(searchQuery.split(/\s+/).filter(word => word.length > 2).join('|'), 'i');
    
    console.log("Searching for:", searchQuery);
    console.log("Using regex:", searchRegex);

    const results = await Law.find({
      $or: [
        { lawTitle: searchRegex },
        { section: searchRegex },
        { legalConcept: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { sabCategory: searchRegex },
        { sectionOverview: searchRegex },
        { legalConsequence: searchRegex },
        { preventionSolutions: searchRegex },
        { stepByStepGuide: searchRegex },
        { jurisdiction: searchRegex }
      ]
    })
    .sort({ 
      // Prioritize matches in important fields
      lawTitle: 1 
    })
    .skip(skip)
    .limit(parseInt(limit))
    .lean();

    const totalCount = await Law.countDocuments({
      $or: [
        { lawTitle: searchRegex },
        { section: searchRegex },
        { legalConcept: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { sabCategory: searchRegex },
        { sectionOverview: searchRegex },
        { legalConsequence: searchRegex },
        { preventionSolutions: searchRegex },
        { stepByStepGuide: searchRegex },
        { jurisdiction: searchRegex }
      ]
    });

    console.log(`Found ${results.length} results for query: "${searchQuery}"`);

    // If no results with regex, try keyword-based search
    let finalResults = results;
    if (results.length === 0) {
      console.log("Trying keyword-based search...");
      finalResults = await keywordBasedSearch(searchQuery, skip, limit);
    }

    return res.json({
      success: true,
      count: finalResults.length,
      totalCount: finalResults.length === 0 ? 0 : totalCount,
      currentPage: parseInt(page),
      totalPages: Math.ceil((finalResults.length === 0 ? 0 : totalCount) / limit),
      results: finalResults.map(item => ({ 
        ...item, 
        score: 1,
        searchMatch: getMatchedFields(item, searchQuery)
      })),
    });

  } catch (error) {
    console.log("Search error:", error.message);
    
    // Final fallback - return all laws and let frontend filter
    const allLaws = await Law.find().lean();
    const filteredResults = allLaws.filter(law => 
      containsSearchTerms(law, searchQuery)
    ).slice(skip, skip + parseInt(limit));

    return res.json({
      success: true,
      count: filteredResults.length,
      totalCount: filteredResults.length,
      currentPage: parseInt(page),
      totalPages: Math.ceil(filteredResults.length / limit),
      results: filteredResults.map(item => ({ ...item, score: 1 })),
    });
  }
});

// Helper function for keyword-based search
async function keywordBasedSearch(query, skip, limit) {
  const keywords = query.toLowerCase().split(/\s+/).filter(word => word.length > 2);
  
  if (keywords.length === 0) return [];

  const keywordRegex = new RegExp(keywords.join('|'), 'i');
  
  const results = await Law.find({
    $or: [
      { lawTitle: keywordRegex },
      { section: keywordRegex },
      { legalConcept: keywordRegex },
      { description: keywordRegex },
      { category: keywordRegex },
      { sabCategory: keywordRegex }
    ]
  })
  .limit(parseInt(limit))
  .skip(skip)
  .lean();

  return results;
}

// Helper function to check if law contains search terms
function containsSearchTerms(law, query) {
  const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2);
  
  if (searchTerms.length === 0) return false;

  const lawText = JSON.stringify(law).toLowerCase();
  
  return searchTerms.some(term => lawText.includes(term));
}

// Helper function to show which fields matched
function getMatchedFields(law, query) {
  const matches = [];
  const searchTerms = query.toLowerCase().split(/\s+/);
  
  const fields = {
    lawTitle: law.lawTitle,
    section: law.section,
    legalConcept: law.legalConcept,
    description: law.description,
    category: law.category,
    sabCategory: law.sabCategory
  };

  Object.entries(fields).forEach(([field, value]) => {
    if (value && searchTerms.some(term => 
      value.toLowerCase().includes(term.toLowerCase())
    )) {
      matches.push(field);
    }
  });

  return matches;
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