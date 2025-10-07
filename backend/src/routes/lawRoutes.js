import express from "express";
import {
  createLaw,
  getAllLaws,
  getLawById,
  updateLaw,
  deleteLaw,
  getAllLawCategories,
  searchLaws,
  getLawsByCategory,
} from "../controllers/lawController.js";

const router = express.Router();

// Create
router.post("/", createLaw);

// Read all
router.get("/", getAllLaws);

// Categories
router.get("/categories", getAllLawCategories);

// Search
router.post("/search", searchLaws);

// ✅ Get laws by category (now POST)
router.post("/category", getLawsByCategory);

// Single law
router.get("/:id", getLawById);

// Update & Delete
router.put("/:id", updateLaw);
router.delete("/:id", deleteLaw);

export default router;
