const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "task_assigned",
        "task_status_changed",
        "member_added",
        "member_removed",
        "role_changed",
        'update_task-details',
        'create_workspace',
        'update_workspace'
      ],
      required: true,
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workspace",
      default: null,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      required: true,
    },
    entityType: {
      type: String,
      trim: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const notificationModel = mongoose.model("notification", notificationSchema);
module.exports = notificationModel;
