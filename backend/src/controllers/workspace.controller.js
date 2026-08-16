const { default: mongoose } = require("mongoose");
const userModel = require("../models/user.model");
const workspaceMemberModel = require("../models/workspace.member.model");
const workspaceModel = require("../models/workspace.model");

const createWorkspace = async (req, res, next) => {
  try {
    const id = req.user._id;
    const { name, description } = req.body;
    const owner = await userModel.findById(id);
    if (owner.status === "bocked" || owner.isDeleted) {
      const err = new Error("you don't have an access to create a workspace");
      err.statusCode = 400;
      return next(err);
    }

    const workspace = await workspaceModel.create({
      name,
      description,
      owner: owner._id,
    });

    await workspaceMemberModel.create({
      workspace: workspace._id,
      user: owner._id,
      role: "owner",
      status: "active",
      joinedAt: new Date(),
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

    if(req.user.role === 'admin'){
      const workspace = await workspaceModel.find().populate('owner' , "-password")
      return res.status(200).json({success:true , workspace})
    }

    const memberShip = await workspaceMemberModel.find({user:req.user._id , status:"active"}).populate('workspace')
    const workspace = memberShip.map((membership)=> membership.workspace)
    return res.status(200).json({success:true , workspace})
   
    

    




    const workspaces = await workspaceModel.find();

    return res.status(200).json({ success: true, workspaces });
  } catch (err) {
    return next(err.message);
  }
};

const getWorkspaceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const member = await workspaceMemberModel
      .findOne({
        user: req.user._id.toString(),
        workspace: id,
      })
      .populate("user")
      .populate("workspace");

    if (!member && req.user.role !== "admin") {
      const err = new Error("You don't have permission to see this workspace");

      err.statusCode = 403;
      return next(err);
    }

    const workspace = await workspaceModel.findById(id);
    return res.status(200).json({ success: true, workspace });
  } catch (err) {
    return next(err.message);
  }
};

const updateWorkspace = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedWorkspace = await workspaceModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true },
    );
    return res.status(201).json({ success: true, updatedWorkspace });
  } catch (err) {
    return next(err.message);
  }
};

module.exports = {
  createWorkspace,
  getWorkspaces,
  getWorkspaceById,
  updateWorkspace,
};
