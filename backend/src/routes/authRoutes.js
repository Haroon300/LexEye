import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController.js";


const router = Router();


router.post("/signup", registerUser);
router.all("/signup",(req, res)=>
    res.status(405).json({error:"Method Not Allowed"})
);

router.post("/signin", loginUser);
router.all("/signin",(req, res)=>
    res.status(405).json({error:"Method Not Allowed"})
);

router.post("/verify", loginUser);
router.all("/verify",(req, res)=>
    res.status(405).json({error:"Method Not Allowed"})
);

router.post("resend-otp", loginUser);
router.all("/resend-otp",(req, res)=>
    res.status(405).json({error:"Method Not Allowed"})
);

router.post("/forgot-password", loginUser);
router.all("/forgot-password",(req, res)=>
    res.status(405).json({error:"Method Not Allowed"})
);

router.post("/reset-password", loginUser);
router.all("/reset-password",(req, res)=>
    res.status(405).json({error:"Method Not Allowed"})
);

export default router;