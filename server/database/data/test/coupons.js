const Coupon = require('../../models/Coupon');

const reset = () => Coupon.deleteMany();

const createAll = async ({
  users,
  accounts,
  organisations,
  couponDiscountRate,
}) => {
  const { organisationUser, internUser } = users;
  const { organisationAccount } = accounts;
  const { financialTimeOrganisation } = organisations;

  await reset();
  const coupon = [
    {
      organisation: financialTimeOrganisation._id,
      organisationAccount: organisationAccount._id,
      intern: internUser._id,
      internName: internUser.name,
      createdBy: organisationUser._id,
      discountRate: couponDiscountRate,
      reservedAmount: 6000, // 120 pound X 50%
      usedAmount: 6000,
      startDate: Date.now() - 20 * 24 * 60 * 60 * 1000,
      endDate: Date.now() - 15 * 24 * 60 * 60 * 1000, // 6days => 120
    },
  ];
  const expiredCoupon = await Coupon.create(coupon);
  return { expiredCoupon };
};

module.exports = {
  createAll,
  reset,
};
