const express = require('express')
const { createTask , getTasks, updateTaskDetails, updateTaskStatus} = require('../controllers/task.controller')
const {authUser} = require('../middleware/auth.middleware')
const authWorkspace = require('../middleware/authorize.workspace')
const router  = express.Router()


router.post('/workspaces/:workspaceId/tasks' , authUser , authWorkspace , createTask )
router.get('/workspace/:workspaceId/get-tasks' , authUser , authWorkspace , getTasks)
router.patch('/workspace/:workspaceId/tasks/:taskId' , authUser , authWorkspace , updateTaskDetails )
router.patch('/workspace/:workspaceId/tasks/:taskId/status' , authUser , authWorkspace , updateTaskStatus)



module.exports = router