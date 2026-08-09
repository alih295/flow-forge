const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [5, "length must be 5 characters long"],
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowerCase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minLength: [8, "password must be 8 character long"],
    },
    profile: {
      profilePic: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["admin", "manager", "member"],
      default: "member",
    },
    otp: {
      type: String,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    otpExpire:{
      type:String
    }
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET);
};

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
