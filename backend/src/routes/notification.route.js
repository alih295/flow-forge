const express = require("express");
const {
  getNotification,
  markNotificationAsRead,
} = require("../controllers/notification.controller");
const router = express.Router();
const { authUser } = require("../middleware/auth.middleware");

router.get("/notifications", authUser, getNotification);
router.patch("/notification/:id/read", authUser, markNotificationAsRead);

module.exports = router;
