const taskModel = require("../models/Task.model");
const userModel = require("../models/user.model");
const workspaceModel = require("../models/workspace.model");
const workspaceMemberModel = require("../models/workspace.member.model");

const getDashboardData = async (req, res, next) => {
  try {
    const totalWorkspaces = await workspaceModel.countDocuments();

    const totalUsers = await userModel.countDocuments();

    const recentUser = await userModel.find().select("name role email status").sort({createdAt:-1}).limit(10) 

    const totalTasks = await taskModel.countDocuments();

    const activeUsers = await userModel.countDocuments({
      status: "active",
    });

    const completedTasks = await taskModel.countDocuments({
      status: "completed",
    });

    const todoTask = await taskModel.countDocuments({status:'todo'})

    const inprogressTask = await taskModel.countDocuments({status:'in-progress'})

    return res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalWorkspaces,
        totalTasks,
        activeUsers,
        completedTasks,
        recentUser,
        todoTask,
        inprogressTask
      },
    });
  } catch (err) {
    return next(err);
  }
};

const workspaceData = async (req, res, next) => {
  try {
    const workspaceMembers = await workspaceMemberModel.find({
      workspace: req.workspace._id,
    }).populate('user' , 'name email profile');
    const totalTasks = await taskModel.countDocuments({
      workspace: req.workspace._id,
    });
    const todoTask = await taskModel.countDocuments({
      workspace: req.workspace._id,
      status: "todo",
    });
    const inprogressTask = await taskModel.countDocuments({
      workspace: req.workspace._id,
      status: "in-progress",
    });
    const completedTask = await taskModel.countDocuments({
      workspace: req.workspace._id,
      status: "completed",
    });
    if (["owner", "manager"].includes(req.workspaceMember.role)) {
      return res.status(200).json({
        success: true,
        workspaceMembers,
        totalTasks,
        inprogressTask,
        completedTask,
        todoTask,
      });
    } else if (req.workspaceMember.role === "member") {
      const assignedTasks = await taskModel.find({
        workspace: req.workspace._id,
        assignedTo: req.user._id,
      });
      const todoTask = await taskModel.find({
        workspace: req.workspace._id,
        assignedTo: req.user._id,status:'todo'
      });
      const inprogressTasks = await taskModel.find({
        workspace: req.workspace._id,
        assignedTo: req.user._id,
        status:'in-progress'
      });
      const completedTasks = await taskModel.find({
        workspace: req.workspace._id,
        assignedTo: req.user._id,
        status:'completed'
      });
      return res.status(200).json({success:true , assignedTasks , todoTask,completedTasks,inprogressTasks})
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = { getDashboardData , workspaceData };
