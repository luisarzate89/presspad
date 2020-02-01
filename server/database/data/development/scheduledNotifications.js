const User = require('../../models/User');
const ScheduledNotification = require('../../models/ScheduledNotification');

module.exports = async () => {
  // users
  const hosts = await User.find({ role: 'host' });
  const interns = await User.find({ role: 'intern' });

  // create ScheduledNotifications
  const scheduledNotifications = [
    {
      user: interns[0],
      secondParty: hosts[0],
      type: 'stayApproved',
      private: false,
      dueDate: Date.now() + 7 * 24 * 60 * 60 * 1000, // after 7 days
    },
    {
      user: hosts[0],
      secondParty: interns[0],
      type: 'stayRequest',
      private: false,
      dueDate: Date.now() + 3 * 24 * 60 * 60 * 1000,
    },
    {
      user: hosts[0],
      type: 'completeProfileRemind',
      private: true,
      dueDate: Date.now() + 3 * 24 * 60 * 60 * 1000,
    },
    {
      user: interns[0],
      secondParty: hosts[1],
      type: 'stayApproved',
      private: false,
      dueDate: Date.now() + 3 * 24 * 60 * 60 * 1000,
    },
  ];

  await ScheduledNotification.create(scheduledNotifications);
};
