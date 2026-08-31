const userModel = require("../models/user.model");
const workspaceMemberModel = require("../models/workspace.member.model");
const createActivityLog = require("../services/activity.log.service");
const createNotification = require("../services/notification.service");

const getWorkspaceMember = async (req, res, next) => {
  try {
    const workspaceMembers = await workspaceMemberModel.find().populate("user");

    return res
      .status(200)
      .json({ success: true, workspaceMembers: workspaceMembers });
  } catch (err) {
    return next(err);
  }
};

const addWorkspaceMembers = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    const { userId, role } = req.body;

    if (
      !["owner", "manager"].includes(req.workspaceMember?.role) &&
      req.user.role !== "admin"
    ) {
      const err = new Error("you dan't have acces to this route");
      err.statusCode = 400;
      return next(err);
    }
    if (!["member", "manager"].includes(role)) {
      const err = new Error("Invalid workspace role");
      err.statusCode = 400;
      return next(err);
    }

    const user = await userModel.findById(userId);
    if (!user) {
      const err = new Error("user is invalid");
      err.statusCode = 409;
      return next(err);
    }

    const existingMember = await workspaceMemberModel.findOne({
      user: userId,
      workspace: workspaceId,
    });

    if (existingMember) {
      const err = new Error("user is alreay a member of this workspace");
      err.statusCode = 409;
      return next(err);
    }

    const addMembers = await workspaceMemberModel.create({
      workspace: workspaceId,
      user: userId,
      role,
      status: "active",
      invitedBy: req.user._id,
      joinedAt: new Date(),
    });
    await createActivityLog({
      workspaceId,
      userId: req.user._id,
      action: "add members to wroksapce",
      entityType:'member',
      entityId: addMembers._id,
    });
    await createNotification({
      senderId: req.user._id,
      recipientId: addMembers.user,
      workspace: req.workspace._id,
      title: "add member to wworkspace",
      type: "member_added",
      message: "add member to this workspace ",
      entityType: "workspace member",
      entityId: addMembers,
    });

    return res.status(200).json({ succes: true, member: addMembers });
  } catch (err) {
    return next(err);
  }
};

const removeWorkspaceMember = async (req, res, next) => {
  try {
    const { userId, workspaceId } = req.params;

    if (String(userId) === String(req.workspace.owner)) {
      const err = new Error("Owner cannot be deleted");
      err.statusCode = 400;
      return next(err);
    }

    if (req.workspaceMember?.role !== "owner" && req.user.role !== "admin") {
      const err = new Error("you don't have access to remove this user");
      err.statusCode = 400;
      return next(err);
    }
    const deletedMember = await workspaceMemberModel.findOneAndDelete({
      user: userId,
      workspace: workspaceId,
    });

    if (!deletedMember) {
      const err = new Error("Workspace member not found");
      err.statusCode = 404;
      return next(err);
    }
    await createActivityLog({
      workspaceId,
      userId: req.user._id,
      action: "remove workspace member",
      entityType: "workspace member",
      entityId: deletedMember._id,
    });
    await createNotification({
      senderId: req.user._id,
      recipientId: deletedMember._id,
      workspaceId: req.workspace._id,
      type: "member_removed",
      title: "dlete member ",
      message: "remove from that task ",
      entityType: "member",
      entityId: deletedMember._id,
    });
    return res
      .status(200)
      .json({ success: true, nessage: "user removed successfully" });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getWorkspaceMember,
  addWorkspaceMembers,
  removeWorkspaceMember,
};
