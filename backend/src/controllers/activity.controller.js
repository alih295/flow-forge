const { default: mongoose } = require("mongoose");
const workspaceMemberModel = require("../models/workspace.member.model");
const activityLogModel = require("../models/activity.log.model");
const workspaceModel = require("../models/workspace.model");
const userModel = require('../models/user.model')

const getActivityLog = async (req, res, next) => {
  try {
    const { search, workspace, action } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    console.log(workspace)
    const filter = {};

    if (req.user.role !== "admin") {
      const workspaceIds = await workspaceMemberModel.distinct("workspace", {
        user: req.user._id,
        status: "active",
      });
      filter.workspace = { $in: workspaceIds };
    }

    if (workspace) {
      if (!mongoose.Types.ObjectId.isValid(workspace)) {
        const err = new Error("invalid workspace");
        err.statusCode = 400;
        return next(err);
      }
      if (
        filter.workspace &&
        !filter.workspace.$in.some((id) => id.toString() === workspace)
      ) {
        const err = new Error("you don't have access to this workspace ");
        err.statusCode = 403;
        return next(err);
      }
      filter.workspace = new mongoose.Types.ObjectId(workspace);
    }
    if (action) {
      filter.entityType = action;
    }

    if (search.trim()) {
      const searchText = search.trim();
      const escapedSearch = searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const regex = new RegExp(escapedSearch, "i");
      const matchUsers = await userModel
        .find({
          $or: [{ name: regex }, { email: regex }],
        })
        .select('_id');
      const userIds = matchUsers.map((user) => user._id);
      filter.$or = [{ description: regex }, { user: { $in: userIds } }];
    }

    const [activities, totalActivities] = await Promise.all([
      activityLogModel
        .find(filter)
        .populate("user", "name email profile")
        .populate("workspace", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      activityLogModel.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      activities,
      currentPage: page,
      totalActivities,
      totalPage: Math.ceil(totalActivities / limit),
    });
  } catch (err) {
    return next(err);
  }
};

const getActivityWorkspaces = async (req, res, next) => {
  try {
    let workspaceIds;
    if (req.user.role === "admin") {
      workspaceIds = await workspaceModel.find({}).select("_id name");
    } else {
      const membership = await workspaceMemberModel
        .find({ user: req.user._id, status: "active" })
        .populate("workspace", "name");

      workspaceIds = membership
        .filter((item) => item.workspace)
        .map((item) => item.workspace);
    }
    return res.status(200).json({ success: true, workspaces: workspaceIds });
  } catch (err) {
    return next(err);
  }
};

module.exports = { getActivityLog, getActivityWorkspaces };
