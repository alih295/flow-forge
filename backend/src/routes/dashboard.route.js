const express = require("express");
const router = express.Router();
const { authUser, authorizeRole } = require("../middleware/auth.middleware");
const {
  getDashboardData,
  workspaceData,
  getRecentActivity,
  getMemberDashboardData,
} = require("../controllers/dashboard.controller");
const authWorkspace = require("../middleware/authorize.workspace");

router.get(
  "/admin/dashboard",
  authUser,
  authorizeRole("admin"),
  getDashboardData,
);
router.get(
  "/workspace/:workspaceId/dashboard",
  authUser,
  authWorkspace,
  workspaceData,
);
router.get(
  "/recent-activity",
  authUser,
  authorizeRole("admin"),
  getRecentActivity,
);

router.get('/dashboard/member' , authUser ,getMemberDashboardData )

module.exports = router;
