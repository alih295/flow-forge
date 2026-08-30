const getNotification = async (req, res, next) => {
  try {
    const notification = await notificationModel
      .find({
        recipient: req.user._id,
      })
      .sort({ createdAt: -1 })
      .populate("sender", "name email profile");

    return res.status(200).json({ success: true, notification });
  } catch (err) {
    return next(err);
  }
};
const markNotificationAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notification = await notificationModel.find({
      recipient: req.user._id,
      _id: id,
    });
    if (!notification) {
      const err = new Error("recipient is not found");
      err.statusCode = 400;
      return next(err);
    }
    user.isRead = true;
    await notification.save();
    return res.status(200).json({success:true , message:'notification marked as true' , notification})
  } catch (err) {
    return next(err);
  }
};

module.exports = { getNotification , markNotificationAsRead };
