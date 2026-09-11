const commentModel = require("../models/comment.model");
const createActivityLog = require("../services/activity.log.service");
const taskModel = require("../models/Task.model");

const createComment = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { content } = req.body;

    const task = await taskModel.findOne({
      _id: taskId,
      workspace: req.workspace._id,
    });

    if (!task) {
      const err = new Error("task not found");
      err.statusCode = 404;
      return next(err);
    }
    if (
      req.user.role !== "admin" &&
      !["member", "owner", "manager"].includes(req.workspaceMember?.role)
    ) {
      const err = new Error(" you don't have permission to access this route");
      err.statusCode = 404;
      return next(err);
    }
    const comment = await commentModel.create({
      user: req.user._id,
      workspace: req.workspace._id,
      task: task._id,
      content: content,
    });

    await createActivityLog({
      userId: req.user._id,
      workspaceId: req.workspace._id,
      action: "create Comment",
      entityType: "comment",
      entityId: comment._id,
    });

    return res.status(201).json({ success: true, comment });
  } catch (err) {
    return next(err);
  }
};

const getComments = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await taskModel.findOne({
      _id: taskId,
      workspace: req.workspace._id,
    });
    if (!task) {
      const err = new Error("task not found");
      err.statusCode = 404;
      return next(err);
    }
    const comments = await commentModel
      .find({ task: taskId, workspace: req.workspace._id })
      .sort({ createdAt: -1 })
      .populate("user", "name email profile");

    return res.status(200).json({ success: true, comments });
  } catch (err) {
    return next(err);
  }
};

const deleteComments = async (req, res, next) => {
  try {
    const { taskId, commentId } = req.params;
    const comment = await commentModel.findOne({
      task: taskId,
      _id: commentId,
      workspace: req.workspace._id,
    });
    if (!comment) {
      const err = new Error("comment not found");
      err.statusCode = 404;
      return next(err);
    }
    const isCommentOwner = req.user._id.toString() === comment.user.toString();

    const isGlobalAdmin = req.user.role === "admin";

    const isWorkspaceManager =
      req.workspaceMember &&
      ["owner", "manager"].includes(req.workspaceMember.role);

    if (!isGlobalAdmin && !isWorkspaceManager && !isCommentOwner) {
      const err = new Error("you don't have permission to delete this comment");
      err.statusCode = 403;
      return next(err);
    }
    await commentModel.findByIdAndDelete(comment._id);
    return res
      .status(200)
      .json({ success: true, message: "comment deleted successfuly" });
  } catch (err) {
    return next(err);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { taskId, commentId } = req.params;
    const { content } = req.body;
    const comment = await commentModel.findOne({
      _id: commentId,
      task: taskId,
      workspace: req.workspace._id,
    });
    if (!comment) {
      const err = new Error("comment is not found");
      err.statusCode = 404;
      return next(err);
    }
    const isGlobalAdmin = req.user.role === 'admin';
    const isCommentOwner = comment.user.toString() === req.user._id.toString();

    if (!isGlobalAdmin && !isCommentOwner) {
      const err = new Error(" yyou don't have permission to update this ");
      err.statusCode = 403;
      return next(err);
    }

    comment.content = content;
    await comment.save();
    await createActivityLog({
      userId: req.user._id,
      workspaceId: req.workspace._id,
      action: "update comment",
      entityType: "comment",
      entityId: comment._id,
    });
    return res.status(200).json({ success: true, comment });
  } catch (err) {
    return next(err);
  }
};

module.exports = { createComment, getComments, deleteComments, updateComment };
