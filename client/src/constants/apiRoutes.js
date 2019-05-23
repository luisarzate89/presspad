const API_PREFIX = "/api";

const LOGIN_URL = "/user/login"; // to use on the server
const API_LOGIN_URL = `${API_PREFIX}${LOGIN_URL}`; // to use on the client

const USER_URL = "/user/check-user";
const API_USER_URL = `${API_PREFIX}${USER_URL}`;

const HOST_PROFILE_URL = "/host/:id";

const API_HOST_PROFILE_URL = `${API_PREFIX}${HOST_PROFILE_URL}`;

module.exports = {
  // CLIENT
  API_LOGIN_URL,
  API_USER_URL,
  HOST_PROFILE_URL,
  // SERVER
  LOGIN_URL,
  USER_URL,
  API_HOST_PROFILE_URL
};
