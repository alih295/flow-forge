const { default: mongoose } = require('mongoose')
const workspaceMemberModel = require('../models/workspace.member.model')

const getActivity = async (req,res,next)=>{
    try{
    const {search , workspace,action} =  req.query
    const page = Number(req.query.page)  || 1
    const limit = number(req.query.limit) || 10 
    const skip = (page-1) * limit
    
    const filter = {}

    if(req.user.role!== 'admin'){
        const workspaceIds = await workspaceMemberModel.distinct("workspace" , {
            user:req.user._id , status:'active'
        })
        filter.workspace = {$in : workspaceIds}
    }

    if(workspace){
        if(!mongoose.Types.ObjectId.isValid(workspace)){
        const err = new Error('invalid workspace')
        err.statusCode = 400
        return next(err)
        }
        if(filter.workspace && !filter.workspace.$in.some((id)=>id.toString()=== workspace)){
            const err = new Error("you don't have access to this workspace ")
        }


    }



    }catch(err){
        return next(err)
    }
}