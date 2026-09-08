const express = require("express");
const validationRequest = require("../middleware/validate");
const { authUser } = require("../middleware/auth.middleware");
const authWorkspace = require("../middleware/authorize.workspace");
const { createComment, getComments } = require("../controllers/comment.controller");
const router = express.Router();
const {body} = require('express-validator')

router.post("/workspace/:workspaceId/tasks/:taskId/comments", [
  body("content").trim().notEmpty().withMessage("comment is required"), 
] , validationRequest , authUser , authWorkspace ,createComment);

router.get('/workspace/:workspaceId/tasks/:taskId/comments' , authUser , authWorkspace , getComments)

module.exports = router;
