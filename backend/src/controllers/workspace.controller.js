const userModel = require("../models/user.model");
const workspaceMemberModel = require("../models/workspace.member.model");
const workspaceModel = require("../models/workspace.model");
const createActivityLog = require("../services/activity.log.service");
const createNotification = require("../services/notification.service");
const taskModel = require("../models/Task.model");
const createWorkspace = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name, description } = req.body;
    const owner = await userModel.findById(userId);
    if (owner.status === "bocked" || owner.isDeleted) {
      const err = new Error("you don't have an access to create a workspace");
      err.statusCode = 400;
      return next(err);
    }

    const workspace = await workspaceModel.create({
      name,
      description,
      owner: userId,
    });

    await workspaceMemberModel.create({
      workspace: workspace._id,
      user: userId,
      role: "owner",
      status: "active",
      joinedAt: new Date(),
    });
    await createActivityLog({
      workspaceId: workspace._id,
      userId: userId,
      action: "create workspace",
      entityType: "workspace",
      entityId: workspace._id,
    });
    await createNotification({
      senderId: req.user._id,
      recipientId: userId,
      type: "create_workspace",
      title: "created workspace",
      message: "workspace is created",
      entityType: "workspace",
      entityId: workspace._id,
    });

    return res.status(200).json({
      success: true,
      workspace: workspace,
    });
  } catch (err) {
    return next(err);
  }
};

const getWorkspaces = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let workspace;
    let totalWorkspace;

    if (req.user.role === "admin") {
      workspace = await workspaceModel
        .find()
        .skip(skip)
        .limit(limit)
        .populate("owner", "-password");
      totalWorkspace = await workspaceModel.countDocuments();
    } else {
      const memberShip = await workspaceMemberModel
        .find({ user: req.user._id, status: "active" })
        .populate({
          path: "workspace",
          populate: {
            path: "owner",
            select: "-password",
          },
        });
      const allWorkspace = memberShip.map((item) => item.workspace);
      members = await workspaceMemberModel.countDocuments({
        workspace: workspace._id,
        status: "active",
      });
      totalWorkspace = allWorkspace.length;
      workspace = allWorkspace.slice(skip, skip + limit);
    }

    workspace = await Promise.all(
      workspace.map(async (item) => {
        const members = await workspaceMemberModel.countDocuments({
          workspace: item._id,
          status: "active",
        });
        item = item.toObject();
        item.members = members;
        return item;
      }),
    );

    return res.status(200).json({
      success: true,
      totalPages: Math.ceil(totalWorkspace / limit),
      currentPage: page,
      totalWorkspace,
      workspace,
    });
  } catch (err) {
    return next(err);
  }
};

const getWorkspaceById = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    const userId = req.user._id;

    const [workspace, memberShip] = await Promise.all([
      workspaceModel.findById(workspaceId),
      workspaceMemberModel.findOne({ workspace: workspaceId, user: userId }),
    ]);
    if (!workspace) {
      const err = new Error("workspace not found");
      err.statusCode = 404;
      return next(err);
    }
    const isAdmin = req.user.role === "admin";
    const isOwner = workspace.owner.toString() === userId.toString()
    const isMember = !!memberShip;

    if (!isAdmin && !isOwner && !isMember) {
      const err = new Error("you don't have permssion to access this route");
      err.statusCode = 403;
      return next(err);
    }

    let totalTask;
    let members;
    let completedTask;

    if (isAdmin || isOwner) {
      [members, totalTask, completedTask] = await Promise.all([
        workspaceMemberModel.find({ workspace: workspaceId }).populate('user' , 'name email role profile'),
        taskModel.countDocuments({ workspace: workspaceId }),
        taskModel.countDocuments({
          workspace: workspaceId,
          status: "completed",
        }),
      ]);
    } else {
      [members, totalTask, completedTask] = await promise.all([
        workspaceMemberModel.find({ workspace: workspaceId }).populate('user' , 'name email profile role'),
        taskModel.countDocuments({ workspace: workspaceId, user: userId.toString() }),
        taskModel.countDocuments({
          workspace: workspaceId,
          user: userId.toString(),
          status: "completed",
        }),
      ]);
    }

    return res
      .status(200)
      .json({ success: true, workspace, members, totalTask, completedTask });
  } catch (err) {
    return next(err);
  }
};

const updateWorkspace = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    const { name, description } = req.body;
    const updateWorkspace = await workspaceModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true },
    );
    await createActivityLog({
      workspaceId,
      userId: req.user._id,
      action: "workspace created",
      entityType: "workspace",
      entityId: workspaceId,
    });
    await createNotification({
      senderId: req.user._id,
      recipientId: updateWorkspace.user,
      type: "update_wprkspace",
      title: "update details of workspace",
      message: "update details of workspace",
      entityType: "workspace",
      entityId: updateWorkspace._id,
    });
    return res.status(201).json({ success: true, updateWorkspace });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createWorkspace,
  getWorkspaces,
  getWorkspaceById,
  updateWorkspace,
};
