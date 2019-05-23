const API_PREFIX = "/api";

const LOGIN_URL = "/user/login"; // to use on the server
const API_LOGIN_URL = `${API_PREFIX}${LOGIN_URL}`; // to use on the client

const USER_URL = "/user/check-user";
const API_USER_URL = `${API_PREFIX}${USER_URL}`;

module.exports = {
  // CLIENT
  API_LOGIN_URL,
  API_USER_URL,

  // SERVER
  LOGIN_URL,
  USER_URL
};
