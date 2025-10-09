import express from "express";
import {
  addBookmark,
  getBookmarks,
  removeBookmark,
} from "../controllers/bookmarkController.js";
import { signinUser } from "../services/authService.js"; // JWT verify

const router = express.Router();

router.use(signinUser);

router.post("/add", addBookmark);
router.get("/", getBookmarks);
router.delete("/:lawId", removeBookmark);

export default router;
