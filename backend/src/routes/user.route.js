const express = require("express");
const { body, param } = require("express-validator");
const validationResult = require("../middleware/validate");
const {
  getUser,
  getSingleUser,
  updateUserStatusAndRole,
  deleteUser,
} = require("../controllers/user.controller");
const { authUser, authorizeRole } = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/get-users", authUser, getUser);
router.get(
  "/get-single-user/:id",
  authUser,
  [param("id").isMongoId().withMessage("Invalid user id format")],
  validationResult,
  getSingleUser,
);
router.patch(
  "/update-user-status-and-role/:id",
  authUser,
  authorizeRole("manager", "admin"),
  [
    param("id").isMongoId().withMessage("invalid userId format"),
    body("role")
      .optional()
      .isIn(["member", "admin", "manager"])
      .withMessage('role must be "user" , "admin" , "manager"'),
    body("status")
      .optional()
      .isIn(["active", "blocked"])
      .withMessage('status must be "active" or "blocked"'),
  ],
  validationResult,
  updateUserStatusAndRole,
);
router.delete(
  "/delete-user/:id",
  authUser,
  authorizeRole("admin"),
  [param("id").isMongoId().withMessage("Invalid UserId Format")],
  validationResult,
  deleteUser,
);

module.exports = router;
