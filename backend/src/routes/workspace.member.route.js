const express= require('express')
const { authUser, authorizeRole } = require('../middleware/auth.middleware')
const { getWorkspaceMember, addWorkspaceMembers, removeWorkspaceMember } = require('../controllers/workspace.member.controller')
const authWorkspace = require('../middleware/authorize.workspace')
const router = express.Router()



router.get('/workspaces/:workspaceId/members' , authUser , authWorkspace , getWorkspaceMember)
router.post('/workspace/:workspaceId/add-members' ,authUser , authorizeRole('admin' , 'manager') , authWorkspace , addWorkspaceMembers)

router.delete('/workspace/:workspaceId/remove-member/:userId' , authUser ,  authWorkspace , removeWorkspaceMember)




module.exports = router

