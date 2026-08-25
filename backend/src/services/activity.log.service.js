const activityLogModel = require("../models/activity.log.model");

const createActivityLog = async ({
  workspaceId,
  userId,
  action,
  entityType,
  entityId,
  description,
  metadata,
}) => {
  const createLog = await activityLogModel.create({
    workspace: workspaceId,
    user: userId,
    action,
    entityType,
    entityId,
    description,
    metadata,
  });

  return createLog;
};
module.exports = createActivityLog;
