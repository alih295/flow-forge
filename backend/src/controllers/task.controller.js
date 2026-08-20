const taskModel = require("../models/Task.model");
const userModel = require("../models/user.model");
const workspaceMemberModel = require("../models/workspace.member.model");

const createTask = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    const { title, description, assignedTo, priority, dueDate } = req.body;
    if (
      req.user.role !== "admin" &&
      !["owner", "manager"].includes(req.workspaceMember.role)
    ) {
      const err = new Error("you don't have a permission to this route");
      err.statusCode = 400;
      return next(err);
    }
    if (assignedTo) {
      const user = await userModel.findById(assignedTo);
      if (!user) {
        const err = new Error("assigned user not found");
        err.statusCode = 400;
        return next(err);
      }
      const isAssignedUser = await workspaceMemberModel.findOne({
        workspace: req.workspace._id,
        user: assignedTo,
        status: "active",
      });
      if (!isAssignedUser) {
        const err = new Error("assigne user musta be a member of workspace");
        err.statusCode = 400;
        return next(err);
      }
    }

    const createdTask = await taskModel.create({
      title,
      description,
      assignedTo,
      createdBy: req.user._id,
      workspace: req.workspace._id,
      priority,
      dueDate,
    });
    if (createdTask) {
      return res.status(200).json({ success: true, task: createdTask });
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = createTask;
