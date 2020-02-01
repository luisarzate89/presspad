const Notification = require("../../models/Notification");

const markAsSeen = (notificationsIds, data) =>
  Notification.updateMany({ _id: { $in: notificationsIds } }, data);

module.exports = markAsSeen;
