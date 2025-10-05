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

// Read all (with pagination & optional keyword)
router.get("/", getAllLaws);

// Categories with counts
router.get("/categories", getAllLawCategories);

// Search (GET not POST ✅)
router.post("/search", searchLaws);

// Get laws by category
router.get("/categories/:category", getLawsByCategory);

// Single law by ID
router.get("/:id", getLawById);

// Update law
router.put("/:id", updateLaw);

// Delete law
router.delete("/:id", deleteLaw);

export default router;
