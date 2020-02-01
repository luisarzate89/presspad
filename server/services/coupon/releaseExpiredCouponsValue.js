const {
  getExpiredCoupons,
  returnCouponsUnusedReservedAmount,
} = require('../../database/queries/coupon');
const { returnCouponsValueToOrg } = require('../../database/queries/account');
const transactionWrapper = require('./../../database/transactionWrapper');

const releaseExpiredCouponsValue = session => async () => {
  const accountsIncrementMap = {};

  // get expired coupons that still reserving money (used != reserved)
  const expiredCoupons = await getExpiredCoupons();

  if (expiredCoupons && expiredCoupons.length) {
    // get coupons ids
    const couponsIds = expiredCoupons.map(i => i._id);
    // updated theses coupons
    let queries = [returnCouponsUnusedReservedAmount(couponsIds, session)];

    // calculate the returned money to orgs account (the total returned amount from coupons)
    expiredCoupons.forEach(
      ({ usedAmount, reservedAmount, organisationAccount }) => {
        const returnedAmount = reservedAmount - usedAmount;
        if (!accountsIncrementMap[organisationAccount]) {
          accountsIncrementMap[organisationAccount] = returnedAmount;
        } else {
          accountsIncrementMap[organisationAccount] += returnedAmount;
        }
      },
    );

    queries = [
      ...queries,
      ...Object.entries(accountsIncrementMap).map(([id, returnedAmount]) =>
        returnCouponsValueToOrg({ id, returnedAmount, session }),
      ),
    ];

    await Promise.all(queries);
  }
};

module.exports = transactionWrapper(releaseExpiredCouponsValue);
