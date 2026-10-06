const express = require("express");
const { authUser, authorizeRole } = require("../middleware/auth.middleware");
const {
  createWorkspace,
  getWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  getAvailableUsers,
} = require("../controllers/workspace.controller");
const authWorkspace = require("../middleware/authorize.workspace");
const router = express.Router();

router.post(
  "/workspace/create",
  authUser,
  authorizeRole("admin", "manager"),
  createWorkspace,
);
router.get("/workspace/get", authUser, getWorkspaces);
router.get(
  "/workspace/by-id/:workspaceId",
  authUser,
  authWorkspace,
  getWorkspaceById,
);
router.patch(
  "/workspace/update/:workspaceId",
  authUser,
  authorizeRole("manager", "admin"),
  updateWorkspace,
);
router.get(
  "/workspace/:workspaceId/available-user",
  authUser,
  authorizeRole("admin"),
  getAvailableUsers,
);

module.exports = router;
