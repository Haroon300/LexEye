import express from "express";
import Auth from "./authRoutes.js";

const router = express.Router();
router.use("/auth", Auth);

export default router;
