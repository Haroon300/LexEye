import express from "express";
import {
  addBookmark,
  getBookmarks,
  removeBookmark,
} from "../controllers/bookmarkController.js";
import { verifyUser } from "../middlewares/authMiddleware.js"; // ⬅️ correct JWT middleware

const router = express.Router();

// All routes require authentication
router.use(verifyUser);

// Routes
router.post("/add", addBookmark);
router.get("/", getBookmarks);
router.delete("/:lawId", removeBookmark);

export default router;
