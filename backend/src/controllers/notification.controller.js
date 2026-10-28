const notificationModel = require("../models/notification.model");

const getNotification = async (req, res, next) => {
  try {
    let notifications;
    let unReadNotification;
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    let filter = {};
    if (req.user.role !== "admin") {
      filter.recipient = req.user._id;
    }

    const [notification, totalNotification, unReadCount] = await Promise.all([
      (notificationModel.find(filter))
        .sort({ createdAli: -1 })
        .populate("sender", "name email profile")
        .populate("workspace", "name description")
        .skip(skip)
        .limit(limit),

      notificationModel.countDocuments(filter),
      notificationModel.countDocuments({
        ...filter,
        isRead: false,
      }),
    ]);
    notifications = notification
    unReadNotification = unReadCount
    return res
      .status(200)
      .json({
        success: true,
        notifications,
        unReadNotification,
        totalPage: Math.ceil(totalNotification / limit),
      });
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
