import express from "express";
import {
  createLaw,
  getAllLaws,
  getLawById,
  updateLaw,
  deleteLaw,
  getCategoriesWithCounts,
} from "../controllers/lawController.js";

const router = express.Router();

router.post("/", createLaw);
router.get("/", getAllLaws);
router.get("/categories", getCategoriesWithCounts);
router.get("/:id", getLawById);
router.put("/:id", updateLaw);
router.delete("/:id", deleteLaw);

export default router;
