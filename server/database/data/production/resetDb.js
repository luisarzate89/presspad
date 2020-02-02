const { Account, ChecklistQuestion, User } = require('./../../models');

const resetDB = async () => {
  try {
    await Account.deleteMany();
    await User.deleteMany();
    await ChecklistQuestion.deleteMany();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error during resting the db, try again', err);
    throw err;
  }
};

module.exports = resetDB;
