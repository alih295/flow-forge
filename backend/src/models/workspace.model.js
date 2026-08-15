const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      enum: ["active", "archive"],
      default: "active",
    },
  },
  { timestamps: true },
);


const workspaceModel = mongoose.model('workspae' , workspaceSchema)

module.exports = workspaceModel