const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      const err = new Error("please login first");
      err.statusCode = 401;

      return next(err);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      const err = new Error("Token Is Invalid or expire");
      err.statusCode = 400;
      return next(err);
    }
    req.user = user;

    next();
  } catch (err) {
    return next(err);
  }
};

const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      const err = new Error(
        `Role (${req.user?.role || "Guest"}) is not allowed to access this resource`,
      );
      err.statusCode = 403;
      return next(err);
    }

    next();
  };
};

module.exports = { authUser, authorizeRole };
