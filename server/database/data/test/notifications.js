const Notification = require('../../models/Notification');

const reset = () => Notification.deleteMany();

const createAll = async ({ users }) => {
  const { hostUser, internUser } = users;
  const notification = {
    user: internUser,
    secondParty: hostUser,
    type: 'stayApproved',
    private: false,
  };

  return Notification.create(notification);
};

module.exports = {
  createAll,
  reset,
};
