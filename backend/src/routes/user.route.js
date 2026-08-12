const express = require("express");
const { getUser, getSingleUser, updateUserStatusAndRole, deleteUser } = require("../controllers/user.controller");
const { authUser, authorizeRole } = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/get-users", authUser, getUser);
router.get('/get-single-user/:id' , authUser ,getSingleUser )
router.patch('/update-user-status-and-role/:id' , authUser , authorizeRole('manager' , 'admin') , updateUserStatusAndRole)
router.delete('/delete-user/:id',authUser , authorizeRole('admin') , deleteUser)


module.exports = router;
