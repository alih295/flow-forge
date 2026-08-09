const express = require('express')
const { registerUser, otpVerify, loginUser } = require('../controllers/user.controller')
const upload = require('../middleware/multer')
const router = express.Router()

router.post('/user/register' ,upload.single('image') ,  registerUser)
router.post('/verify-otp' ,otpVerify )
router.post('/user/login' ,  loginUser)








module.exports = router

