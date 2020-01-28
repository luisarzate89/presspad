const User = require("../../models/User");
const Account = require("../../models/Account");

module.exports = async () => {
  const adminAccount = await Account.findOne();

  // data should be changed using mongod/campass
  const admin = {
    email: "admin@test.com",
    name: "test name",
    password: "123456",
    role: "admin",
    account: adminAccount._id,
  };
  await User.create(admin);
};
