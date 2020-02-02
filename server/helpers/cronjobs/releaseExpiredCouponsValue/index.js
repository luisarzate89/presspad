const { releaseExpiredCouponsValue } = require('./../../../services/coupon');

module.exports = async Sentry => {
  try {
    await releaseExpiredCouponsValue();
  } catch (error) {
    Sentry.captureException(error);
  }
};
