const API_PREFIX = "/api";

const LOGIN_URL = "/user/login"; // to use on the server
const API_LOG_URL = `${API_PREFIX}${LOGIN_URL}`; // to use on the client

module.exports = {
  // CLIENT
  LOGIN_URL,

  // SERVER
  API_LOG_URL
};
