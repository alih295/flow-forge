const express = require('express')
const { registerUser } = require('../controllers/user.controller')
const upload = require('../middleware/multer')
const router = express.Router()

router.post('/user/register' ,upload.single('image') ,  registerUser)








module.exports = router

