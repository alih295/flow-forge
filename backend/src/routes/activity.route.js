const express = require("express");
const {
  getActivityLog,
  getActivityWorkspaces,
} = require("../controllers/activity.controller");
const router = express.Router();
const { authUser } = require("../middleware/auth.middleware");

router.get("/get-activity", authUser, getActivityLog);
router.get("/get-activity/workspace", authUser, getActivityWorkspaces);

module.exports = router;
