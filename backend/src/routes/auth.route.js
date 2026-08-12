const express = require("express");
const {
  registerUser,
  otpVerify,
  loginUser,
  getMe,
  logoutUser,
} = require("../controllers/auth.controller");
const upload = require("../middleware/multer");
const { authUser } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/user/register", upload.single("image"), registerUser);
router.post("/verify-otp", otpVerify);
router.post("/user/login", loginUser);
router.get("/user/profile", authUser, getMe);
router.get("/logout", authUser, logoutUser);

module.exports = router;
