import express from "express";
import { addBookmark, getBookmarks, removeBookmark } from "../controllers/bookmarkController.js";
import { signinUser } from "../services/authService.js"; // JWT verify

const router = express.Router();

router.post("/", signinUser, addBookmark);
router.get("/", signinUser, getBookmarks);
router.delete("/:lawId", signinUser, removeBookmark);

export default router;
