import express from "express";
import Auth from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import lawRoutes from "./lawRoutes.js";
import BookmarkRouter from "./bookmarkRoutes.js";

const router = express.Router();
router.use("/auth", Auth);
router.use("/user", userRoutes);
router.use("/laws", lawRoutes);
router.use("/bookmarks", BookmarkRouter);

export default router;