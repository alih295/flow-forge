const mongoose = require("mongoose");

const workspaceMemberSchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workspace",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "manager", "member"],
      default: "member",
    },
    status: {
      type: String,
      enum: ["invited", "active", "removed"],
      default: "active",
    },
    joinedAt: {
      type: Date,
      default: null,
    },
    invitedBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
    }
  },
  { timestamps: true },
);

workspaceMemberSchema.index({ workspace: 1, user: 1 }, { unique: true });

const workspaceMemberModel = mongoose.model(
  "workspaceMember",
  workspaceMemberSchema,
);

module.exports = workspaceMemberModel;
