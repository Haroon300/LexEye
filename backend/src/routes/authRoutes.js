import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController.js";


const router = Router();


router.post("/signup", registerUser);
router.all("/signup",(req, res)=>
    res.status(405).json({error:"Method Not Allowed"})
);

router.post("/login", loginUser);
router.all("/login",(req, res)=>
    res.status(405).json({error:"Method Not Allowed"})
);