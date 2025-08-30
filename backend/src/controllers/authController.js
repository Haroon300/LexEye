import { registerSchema } from "../validations/authValidation.js";
import * as AuthService from "../services/authService.js";
import {asyncWrapper} from "../utils/asyncWrapper.js";
import { loginSchema } from "../validations/authValidation.js";
import { signinUser, verifyUserOtp } from "../services/authService.js";
import { resendUserOtp } from "../services/authService.js";
import {
  updatePassword,
} from "../services/authService.js";


export const register = asyncWrapper(async (req, res) => {
 
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await AuthService.registerUser(req.body);
    return res.status(201).json(result);
 
});


export const signin = asyncWrapper( async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await signinUser(req.body);
    return res.json(result);
  
});

export const verifyOtp = asyncWrapper( async (req, res) => {
  
    const result = await verifyUserOtp(req.body);
    return res.json(result);
});


export const resendOtp = asyncWrapper( async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const result = await resendUserOtp(email);
    return res.json(result);
});



export const forgotPassword = asyncWrapper( async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const result = await resendUserOtp(email);
    return res.json(result);
});


export const resetPassword = asyncWrapper( async (req, res) => {
    const { password } = req.body;
    const user = req.user;
    const result = await updatePassword( user.email, password);
    return res.json(result);
});