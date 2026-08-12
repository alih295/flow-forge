const { ConnectionStates } = require("mongoose");
const userModel = require("../models/user.model");

const getUser = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const skip = (page - 1) * limit;

    const users = await userModel
      .find()
      .select("-password")
      .skip(skip)
      .limit(limit);
    const totalUsers = await userModel.countDocuments();
    if (!users) {
      const err = new Error("error while fetching users");
      err.statusCde = 400;
      return next(err);
    }
    return res.status(200).json({
      success: true,
      totalUsers,
      totalPage: Math.ceil(totalUsers / limit),
      results: users.length,
      users,
    });
  } catch (err) {
    return next(err);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      const err = new Error("user is not found");
      err.statusCde = 400;
      return next(err);
    }

    return res.status(200).json({ user: user });
  } catch (err) {
    return next(err);
  }
};

const updateUserStatusAndRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, status } = req.body;
    const user = await userModel.findById(id);
    if (!user) {
      const err = new Error("user is not found");
      err.statusCode = 400;
      return next(err);
    }
    if (role) {
      if (req.user.role === "manager") {
        const err = new Error("manager can't have access to assign a role");
        err.statusCde = 400;
        return next(err);
      }
      user.role = role;
    }
    if (status) {
      user.status = status;
    }
    await user.save();
    return res.status(200).json({ user });
  } catch (err) {
    return next(err);
  }
};
    const deleteUser = async(req,res,next)=>{
        try{
            const {id} = req.params
            await userModel.findByIdAndDelete(id)
            return res.status(200).json({message:'user deletd successfully'})
        }catch(err){
            return next(err)
        }



    }




module.exports = { getUser, getSingleUser, updateUserStatusAndRole , deleteUser };
