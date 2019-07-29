const Notification = require("../models/Notification");

const notifications = {};
module.exports = notifications;

notifications.createNotification = data => Notification.create(data);
