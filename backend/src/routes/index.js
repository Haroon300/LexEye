import express from "express";
import Auth from "./authRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();
router.use("/auth", Auth);
router.use("/user", userRoutes);

export default router;