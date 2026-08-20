const express = require('express')
const createTask = require('../controllers/task.controller')
const {authUser} = require('../middleware/auth.middleware')
const authWorkspace = require('../middleware/authorize.workspace')
const router  = express.Router()


router.post('/workspaces/:id/tasks' , authUser , authWorkspace , createTask )



module.exports = router