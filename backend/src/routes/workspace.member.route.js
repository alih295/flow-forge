const express= require('express')
const { authUser, authorizeRole } = require('../middleware/auth.middleware')
const { getWorkspaceMember, addWorkspaceMembers, removeWorkspaceMember } = require('../controllers/workspace.member.controller')
const authWorkspace = require('../middleware/authorize.workspace')
const router = express.Router()



router.get('/workspaces/:id/members' , authUser , authWorkspace , getWorkspaceMember)
router.post('/workspace/:id/add-members' ,authUser , authorizeRole('admin' , 'manager') , authWorkspace , addWorkspaceMembers)

router.delete('/workspace/:id/remove-member/:userId' , authUser ,  authWorkspace , removeWorkspaceMember)




module.exports = router

