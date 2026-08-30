const taskModel = require("../models/Task.model");
const userModel = require("../models/user.model");
const workspaceMemberModel = require("../models/workspace.member.model");
const createActivityLog = require("../services/activity.log.service");
const createNotification = require("../services/notification.service");

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
      await createActivityLog({
        workspaceId: req.workspace._id,
        userId: req.user._id,
        action: "new task created",
        entityType: "task",
        entityId: createdTask._id,
      });
      await createNotification({
        senderId: req.user._id,
        workspaceId: req.workspace._id,
        recipientId: assignedTo,
        type: "task-assigned",
        title: "new task is assigned",
        message: "task is created and assigned to you",
        entityType: "task",
        entityId: createdTask._id,
      });

      return res.status(200).json({ success: true, task: createdTask });
    }
  } catch (err) {
    return next(err);
  }
};
const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskModel
      .find({ workspace: req.workspace._id })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    if (!tasks) {
      const err = new Error("task not found");
      err.statusCode = 400;
      return next(err);
    }

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (err) {
    return next(err);
  }
};

const updateTaskDetails = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { title, description, priority, dueDate, assignedTo } = req.body;

    if (
      req.user.role !== "admin" &&
      !["owner", "manager"].includes(req.workspaceMember.role)
    ) {
      const err = new Error("you don't have to access this route");
      err.statusCode = 400;
      return next(err);
    }

    const task = await taskModel.findOne({
      workspace: req.workspace._id,
      _id: taskId,
    });
    if (!task) {
      const err = new Error("please chose a valid task");
      err.statusCode = 403;
      return next(err);
    }
    if (assignedTo) {
      const isAssignedUser = await workspaceMemberModel.findOne({
        workspace: req.workspace._id,
        user: assignedTo,
        status: "active",
      });
      if (!isAssignedUser) {
        const err = new Error("please choose a valid user");
        err.statusCode = 400;
        return next(err);
      }
      task.assignedTo = assignedTo;
      await createNotification({
        senderId: req.user._id,
        recipientId: assignedTo,
        workspaceId: req.workspace._id,
        type: "update-task-details",
        title: "update user ",
        message: "update user of a workspace like add new or previous user",
        entityType: "task",
        entityId: task._id,
      });
    }
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;

    await task.save();
    await createActivityLog({
      workspaceId: req.workspace._id,
      userId: req.user._id,
      action: "update task details",
      entityType: "task",
      entityId: task._id,
    });

    return res.status(200).json({ success: true, task });
  } catch (err) {
    return next(err);
  }
};

const updateTaskStatus = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    if (!["todo", "in-progress", "completed"].includes(status)) {
      const err = new Error("Please choose a valid status");
      err.statusCode = 400;
      return next(err);
    }

    const task = await taskModel.findOne({
      _id: taskId,
      workspace: req.workspace._id,
    });
    if (!task) {
      const err = new Error("task not found");
      err.statusCode = 400;
      return next(err);
    }
    if (req.user.role === "admin") {
    } else if (["owner", "manager"].includes(req.workspaceMember.role)) {
    } else if (task.assignedTo.toString() === req.user._id.toString()) {
    } else {
      const err = new Error("you can;t update the status");
      err.statusCode = 400;
      return next(err);
    }

    task.status = status;
    await task.save();
    await createActivityLog({
      workspaceId: req.workspace._id,
      userId: req.user._id,
      action: "change the staus of task",
      entityType: "task",
      entityId: task._id,
    });
    await createNotification({
      senderId: req.user._id,
      recipientId: task.user,
      workspaceId: req.workspace._id,
      type: "task_staus_changed",
      title: "status changed",
      message: "update status of task",
      entityType: "task",
      entityId: task._id,
    });

    return res.status(200).json({ success: true, task });
  } catch (err) {
    return next(err);
  }
};

module.exports = { createTask, getTasks, updateTaskDetails, updateTaskStatus };
