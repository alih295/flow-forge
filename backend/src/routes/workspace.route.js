const express = require('express')
const { authUser, authorizeRole } = require('../middleware/auth.middleware')
const { createWorkspace, getWorkspaces, getWorkspaceById, updateWorkspace } = require('../controllers/workspace.controller')
const router = express.Router()

router.post('/workspace/create' , authUser , authorizeRole('admin' , 'manager') , createWorkspace)
router.get('/workspace/get' , authUser  , getWorkspaces)
router.get('/workspace/by-id/:id' , authUser , getWorkspaceById)
router.put('/workspace/update' , authUser , authorizeRole('manager' , 'admin'), updateWorkspace)



module.exports = router