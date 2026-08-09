const userModel = require("../models/user.model");
const uploadToCloudinary = require("../utils/cloudinary.upload");
const nodemailer = require('nodemailer')

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const isUserAlreadyExist = await userModel.findOne({ email });

    if (isUserAlreadyExist) {
      const err = new Error("user is already exist");
      err.statusCode = 400;
      return next(err);
    }
    let imageUrl = "";
    if (req.file) {
      const cloudinaryResult = await uploadToCloudinary(
        req.file.buffer,
        "user_profiles",
      );
      imageUrl = cloudinaryResult.secure_url; // Cloudinary URL receive hua
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = new Date(Date.now() + 5 * 60 * 1000);

    const user = await userModel.create({
      name,
      email,
      otp,
      password,
      otpExpire,
      profile: { profilePic: imageUrl },
    });
    const token = user.generateToken();
    res.cookie("token", token);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Your 16-character App Password
      },
    });

    const mailOptions = {
      from: `"Flow Forge" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Account - OTP",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee">
          <h2 style="color: #333">Welcome to our Site!</h2>
          <p>Please use the following OTP to verify your email:</p>
          <h1 style="background: #0000; color:"white" ; padding: 10px; text-align: center; letter-spacing: 5px;">${otp}</h1>
          <p style="color: #666 text-align: center;">This OTP is valid for 5 minutes only.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: "OTP sent to your email. Please verify to continue.",
      email: user.email,
    });
  } catch (err) {
    return next(err);
  }
};

const otpVerify = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    
    const user = await userModel.findOne({ email });

    if (!user) {
     const err = new Error("user is not found");
      err.statusCode = 400;
      return next(err);
    }
    console.log(user.otp)
    console.log(otp)
    if (user.otp !== String(otp).trim()) {
     const err = new Error("Invalid OTP");
      err.statusCode = 400;
      return next(err);
    }

    if (new Date() > user.otpExpire) {
      const err = new Error("OTP is Expire");
      err.statusCode = 400;
      return next(err);
    }
    user.isVerify = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();
    return res.status(200).json({
      message: "email is verified you can now login ",
    });
  } catch (err) {
    return next(err);
  }
};
const loginUser = async(req,res,next)=>{

}



module.exports = { registerUser, otpVerify,loginUser };
