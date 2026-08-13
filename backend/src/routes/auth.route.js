const express = require("express");
const {
  registerUser,
  otpVerify,
  loginUser,
  getMe,
  logoutUser,
} = require("../controllers/auth.controller");
const upload = require("../middleware/multer");
const { body } = require("express-validator");
const { authUser } = require("../middleware/auth.middleware");
const validationResult = require("../middleware/validate");
const router = express.Router();

router.post(
  "/user/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("name is required")
      .isLength({ min: 5 })
      .withMessage("name must be atleast 5 characters long"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("email is required")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 8 })
      .withMessage("password must b 8 characters long"),
  ],
  validationResult,
  upload.single("image"),
  registerUser,
);
router.post(
  "/verify-otp",
  [body("otp").isLength({ min: 6 }).withMessage("otp must be 6 characters ")],
  validationResult,
  otpVerify,
);
router.post(
  "/user/login",
  [
    body("email").trim().isEmail().withMessage("valid email is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("password must be 8 characters long"),
  ],
  validationResult,
  loginUser,
);
router.get("/user/profile", authUser, getMe);
router.get("/logout", authUser, logoutUser);

module.exports = router;
