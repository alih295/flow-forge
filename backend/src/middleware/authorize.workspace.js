const workspaceMemberModel = require("../models/workspace.member.model");
const workspaceModel = require("../models/workspace.model");

const authWorkspace = async (req, res, next) => {
  try {
    const { id } = req.params;

    const workspace = await workspaceModel.findById(id);

    if (!workspace) {
      const err = new Error("workspace not found");
      err.statusCode = 404;
      return next(err);
    }

    const member = await workspaceMemberModel.findOne({
      workspace: id,
      user: req.user._id,
      status: "active",
    });

    if (!member && req.user.role !== "admin") {
      const err = new Error("you don't have access thi workspace ");
      err.statusCode = 400;
      return next(err);
    }
    req.workspace = workspace;
    req.workspaceMember = member;
    next();
  } catch (err) {
    return next(err);
  }
};
module.exports = authWorkspace