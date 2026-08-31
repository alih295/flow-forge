const express = require("express");
const {
  getNotification,
  markNotificationAsRead,
  markAllNotificationAsRead,
} = require("../controllers/notification.controller");
const router = express.Router();
const { authUser } = require("../middleware/auth.middleware");

router.get("/notifications", authUser, getNotification);
router.patch("/notification/:id/read", authUser, markNotificationAsRead);
router.patch('/notification/read-all' , authUser , markAllNotificationAsRead)

module.exports = router;
