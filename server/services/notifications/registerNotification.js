const { createNotification } = require('../../database/queries/notification');

module.exports = notification => createNotification(notification);
