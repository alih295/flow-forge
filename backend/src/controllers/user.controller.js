const userModel = require("../models/user.model");
const uploadToCloudinary = require("../utils/cloudinary.upload");

const registerUser = async (req, res , next) => {
  try {
    const { name, email, password } = req.body;
    const isUserAlreadyExist = await userModel.findOne({ email });

    if (isUserAlreadyExist) {
        const err = new Error('user is already exist')
        err.statusCode = 400
      return next(err)
    }
    let imageUrl = "";
    if (req.file) {
      const cloudinaryResult = await uploadToCloudinary(
        req.file.buffer,
        "user_profiles",
      );
      imageUrl = cloudinaryResult.secure_url; // Cloudinary URL receive hua
    }

    const user = await userModel.create({ name, email, password, profile:{profilePic:imageUrl} });
    const token = user.generateToken();
    res.cookie("token", token);

    return res.status(201).json({ success: true, user: user, token: token });
  } catch (err) {
    return next(err);
  }
};

module.exports = { registerUser };
