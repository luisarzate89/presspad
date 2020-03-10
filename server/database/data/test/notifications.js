const Notification = require('../../models/Notification');

const reset = () => Notification.deleteMany();

const createAll = async ({ users, bookings }) => {
  const { hostUser, internUser } = users;
  const { pendingBooking } = bookings;

  const notifications = [
    {
      user: internUser,
      secondParty: hostUser,
      type: 'stayApproved',
      private: false,
    },
    {
      user: hostUser,
      secondParty: internUser,
      type: 'stayRequest',
      private: false,
      booking: pendingBooking._id,
    },
  ];

  const [stayApproved, stayRequest] = await Notification.create(notifications);
  return { stayApproved, stayRequest };
};

module.exports = {
  createAll,
  reset,
};
