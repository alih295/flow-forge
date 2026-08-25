const express = require("express");
const router = express.Router();
const { authUser, authorizeRole } = require("../middleware/auth.middleware");
const { getDashboardData } = require("../controllers/dashboard.controller");
const authWorkspace = require("../middleware/authorize.workspace");

router.get("/admin/dashboard",
  authUser,
  authorizeRole("admin"),
  getDashboardData,
);
router.get('/workspace/:workspaceId/dashboard' , authUser, authWorkspace , )

module.exports = router;
