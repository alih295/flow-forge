const notificationModel = require("../models/notification.model");

const getNotification = async (req, res, next) => {
  try {
    let notification;
    if (req.user.role === "admin") {
      notification = await notificationModel
        .find({})
        .sort({ createdAt: -1 })
        .limit(10)
        .populate("sender", "name email profile");
    } else {
      notification = await notificationModel
        .find({
          recipient: req.user._id,
        })
        .sort({ createdAt: -1 })
        .populate("sender", "name email profile");
    }

    return res.status(200).json({ success: true, notification });
  } catch (err) {
    return next(err);
  }
};
const markNotificationAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notification = await notificationModel.findOne({
      recipient: req.user._id,
      _id: id,
    });
    if (!notification) {
      const err = new Error("recipient is not found");
      err.statusCode = 400;
      return next(err);
    }
    notification.isRead = true;
    await notification.save();
    return res.status(200).json({
      success: true,
      message: "notification marked as true",
      notification,
    });
  } catch (err) {
    return next(err);
  }
};

const markAllNotificationAsRead = async (req, res, next) => {
  try {
    const result = await notificationModel.updateMany(
      { recipient: req.user._id, isRead: false },
      {
        $set: {
          isRead: true,
        },
      },
    );
    return res.status(200).json({
      success: true,
      message: "all notificatio marked as read",
      updatedCount: result.modifiedCount,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getNotification,
  markNotificationAsRead,
  markAllNotificationAsRead,
};
