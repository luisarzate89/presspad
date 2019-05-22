const API_PREFIX = "/api";

const LOGIN_URL = "/user/login"; // to use on the server
const API_LOGIN_URL = `${API_PREFIX}${LOGIN_URL}`; // to use on the client

module.exports = {
  // CLIENT
  API_LOGIN_URL,

  // SERVER
  LOGIN_URL
};
