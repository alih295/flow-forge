const userModel = require("../models/user.model");
const workspaceMemberModel = require("../models/workspace.member.model");

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
    const { id } = req.params;
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
      workspace: id,
    });

    if (existingMember) {
      const err = new Error("user is alreay a member of this workspace");
      err.statusCode = 409;
      return next(err);
    }

    const addMembers = await workspaceMemberModel.create({
      workspace: id,
      user: userId,
      role,
      status: "active",
      invitedBy: req.user._id,
      joinedAt: new Date(),
    });

    return res.status(200).json({ succes: true, member: addMembers });
  } catch (err) {
    return next(err);
  }
};

const removeWorkspaceMember = async (req, res, next) => {
  try {
    const { userId, id } = req.params;

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
      workspace: id,
    });

    if (!deletedMember) {
      const err = new Error("Workspace member not found");
      err.statusCode = 404;
      return next(err);
    }
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
