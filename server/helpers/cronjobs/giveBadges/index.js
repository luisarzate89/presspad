const { getHostsDeserveBadge, giveBadge } = require("../../../database/queries/profile/profileBadge");

module.exports = async (Sentry) => {
  try {
    const hosts = await getHostsDeserveBadge();
    const profileIds = hosts.map(host => host.profile._id);
    await giveBadge(profileIds);
  } catch (error) {
    Sentry.captureException(error);
  }
};
