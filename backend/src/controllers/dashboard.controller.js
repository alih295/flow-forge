const taskModel = require("../models/Task.model");
const userModel = require("../models/user.model");
const workspaceModel = require("../models/workspace.model");

const getDashboardData = async (req, res, next) => {
  try {
    const totalWorkspaces = await workspaceModel.countDocuments();

    const totalUsers = await userModel.countDocuments();

    const totalTasks = await taskModel.countDocuments();

    const activeUsers = await userModel.countDocuments({
      status: "active",
    });

    const completedTasks = await taskModel.countDocuments({
      status: "completed",
    });

    return res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalWorkspaces,
        totalTasks,
        activeUsers,
        completedTasks,
      },
    });
  } catch (err) {
    return next(err);
  }
};

const workspaceData = async(req,res,next)=>{
    try {
        const taskTodo = await taskModel.countDocuments({status:'todo'})
            const taskCompleted = await 
        if(['owner' , 'manager' ].includes(req.workspaceMember.role)){
            const workspaceMmber = await workspaceMemberModel.countDocumen()
            
        }
        
    } catch (err) {
        return next(err)
        
    }

}

module.exports = {getDashboardData}
