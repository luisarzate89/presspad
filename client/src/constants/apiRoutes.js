const API_PREFIX = "/api";

const LOGIN_URL = "/user/login"; // to use on the server
const API_LOGIN_URL = `${API_PREFIX}${LOGIN_URL}`; // to use on the client

const SIGNUP_URL = "/user/signup";
const API_SIGNUP_URL = `${API_PREFIX}${SIGNUP_URL}`;

const CHECK_REFERRAL_URL = "/user/check-referral";
const API_CHECK_REFERRAL_URL = `${API_PREFIX}${CHECK_REFERRAL_URL}`;

const USER_URL = "/user/check-user";
const API_USER_URL = `${API_PREFIX}${USER_URL}`;

module.exports = {
  // CLIENT
  API_LOGIN_URL,
  API_SIGNUP_URL,
  API_USER_URL,
  API_CHECK_REFERRAL_URL,

  // SERVER
  LOGIN_URL,
  SIGNUP_URL,
  USER_URL,
  CHECK_REFERRAL_URL
};
