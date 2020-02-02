const User = require('../../models/User');
const Notification = require('../../models/Notification');

module.exports = async () => {
  // users
  const hosts = await User.find({ role: 'host' }).sort({ name: 1 });
  const interns = await User.find({ role: 'intern' }).sort({ name: 1 });

  // create notifications
  const notifications = [
    {
      user: interns[1], // mone
      secondParty: hosts[0],
      type: 'stayApproved',
      private: false,
    },
    {
      user: hosts[0],
      secondParty: interns[1],
      type: 'stayRequest',
      private: false,
    },
    {
      user: hosts[0],
      type: 'completeProfileRemind',
      private: true,
    },
    {
      user: interns[1],
      secondParty: hosts[1],
      type: 'stayApproved',
      private: false,
    },
  ];

  await Notification.create(notifications);
};
