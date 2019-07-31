const Notification = require("../../models/Notification");

const createNotification = data => Notification.create(data);

module.exports = createNotification;
