import {generateOtp} from "../utils/generateOtp.js";
import {sendEmail} from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";

export const userRegister = async (data) => {
  const {name, email, password} = data;

  const existingUser = await User.findOne({email});
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashed = await bcrypt.hash(password, 10);
  const otp = generateOtp();
  const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

  const user = await User.create({
    name,
    email,
    password: hashed,
    otp,
    otpExpiry,
  });

  await sendEmail(
    email,
    "Your OTP Code",
    `<h2>OTP for login LexEye</h2> <p>Your OTP is ${otp}. This OTP is valid for 15 minutes.</p>`
  )

  return {message : "OTP sent successfully", userId: user._id};
};

export const signinUser = async ({email, password}) => {

    const user = await User.findOne({email});
    if (!user) {throw new Error("User not found");}

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {throw new Error("Invalid credentials");}

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
    
    return {status: "success", message: "User logged in successfully",data: token};
}

export const verifyUserOtp = async ({email, otp}) => {
    const user = await User.findOne({email});
    if (!user) {throw new Error("User not found");}

    if (user.otp !== otp) {throw new Error("Invalid OTP");}
    if (user.otpExpiry < Date.now()) {throw new Error("OTP expired");}

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

    user.otp = null;
    user.otpExpiry = null;
    user.save();
    return {
        status: "login Successful",
        token,
        user: {
            name: user.name,
            email: user.email,
            profilePic: user.profilePic
        },
    };
}

const resendOtp = async ({email}) => {
    const user = await User.findOne({email});
    if (!user) {throw new Error("User not found");}

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendEmail(
        email,
        "LexEye OTP",
        `<h2>Hello ${user.name}</h2> <p>Your new OTP is <b>${otp}</b>.</br> This OTP is valid for 15 minutes.</p>`
    );

    return {message: "New OTP sent successfully to email"};
}


export const findUserById = async (id) => {
    const user = await User.findById(id);
    return user;
}

export const updatePassword = async (id, password) => {
    const user = await User.findOne({email});
    if (!user) {throw new Error("User not found");}

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();
    return {message: "Password updated successfully"};
}