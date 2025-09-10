import Law from "../models/lawModel.js";
import {asyncWrapper} from "../utils/asyncWrapper.js";

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
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
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

// 🔎 Search by keyword
export const searchLaws = asyncWrapper(async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  const laws = await Law.find({
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ],
  });

  res.json(laws);
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
