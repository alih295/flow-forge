const notificationModel = require('../models/notification.model')


const createNotification = async ({
  senderId,
  recipientId,
  workspaceId,
  type,
  title,
  message,
  entityType,
  entityId,
}) => {
  const createdNotification = await notificationModel.create({
    recipient: recipientId,
    sender: senderId,
    workspace: workspaceId,
    type,
    title,
    message,
    entityType,
    entityId,
  });

  return createdNotification;
};

module.exports = createNotification;