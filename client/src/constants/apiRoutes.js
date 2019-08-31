const API_PREFIX = "/api";

const LOGIN_URL = "/user/login"; // to use on the server
const API_LOGIN_URL = `${API_PREFIX}${LOGIN_URL}`; // to use on the client

const SIGNUP_URL = "/user/signup";
const API_SIGNUP_URL = `${API_PREFIX}${SIGNUP_URL}`;

const CHECK_REFERRAL_URL = "/user/check-referral";
const API_CHECK_REFERRAL_URL = `${API_PREFIX}${CHECK_REFERRAL_URL}`;

const USER_URL = "/user/check-user";
const API_USER_URL = `${API_PREFIX}${USER_URL}`;

const GET_ORGS_URL = "/user/get-all-orgs";
const API_GET_ORGS_URL = `${API_PREFIX}${GET_ORGS_URL}`;

const HOST_PROFILE_URL = "/host/:id";
const API_HOST_PROFILE_URL = `${API_PREFIX}${HOST_PROFILE_URL}`;

const GET_INTERN_STATUS = "/intern/status";
const API_GET_INTERN_STATUS = `${API_PREFIX}${GET_INTERN_STATUS}`;

const INTERN_PROFILE_URL = "/interns/:id/profile/";
const API_INTERN_PROFILE_URL = `${API_PREFIX}${INTERN_PROFILE_URL}`;

const HOST_COMPLETE_PROFILE = "/hosts/complete-profile";
const API_HOST_COMPLETE_PROFILE = `${API_PREFIX}${HOST_COMPLETE_PROFILE}`;

const INTERN_COMPLETE_PROFILE = "/interns/complete-profile";
const API_INTERN_COMPLETE_PROFILE = `${API_PREFIX}${INTERN_COMPLETE_PROFILE}`;

const BOOKING_REQUEST_URL = "/new-booking";
const API_BOOKING_REQUEST_URL = `${API_PREFIX}${BOOKING_REQUEST_URL}`;

const GET_USER_BOOKINGS_URL = "/interns/:id/bookings";
const API_GET_USER_BOOKINGS_URL = `${API_PREFIX}${GET_USER_BOOKINGS_URL}`;

const GET_BOOKING_URL = "/bookings/:id";
const API_GET_BOOKING_URL = `${API_PREFIX}${GET_BOOKING_URL}`;

const SEARCH_PROFILES_URL = "/search-profiles";
const API_SEARCH_PROFILES_URL = `${API_PREFIX}${SEARCH_PROFILES_URL}`;

const ADMIN_STATS_URL = "/admin-stats";
const API_ADMIN_STATS_URL = `${API_PREFIX}${ADMIN_STATS_URL}`;

const VERIFY_PROFILE_URL = "/verify-profile";
const API_VERIFY_PROFILE_URL = `${API_PREFIX}${VERIFY_PROFILE_URL}`;

const ORGS_DASHBOARD = "/organisation-dashboard";
const API_ORGS_DASHBOARD_URL = `${API_PREFIX}${ORGS_DASHBOARD}`;

const INTERN_DASHBOARD_URL = "/interns/dashboard";
const API_INTERN_DASHBOARD_URL = `${API_PREFIX}${INTERN_DASHBOARD_URL}`;

const MY_PROFILE_URL = "/my-profile";
const API_MY_PROFILE_URL = `${API_PREFIX}${MY_PROFILE_URL}`;

const UPLOAD_SIGNED_URL = "/upload/signed-url";
const API_UPLOAD_SIGNED_URL = `${API_PREFIX}${UPLOAD_SIGNED_URL}`;

const REVIEW_URL = "/booking/:id/review";
const API_REVIEW_URL = `${API_PREFIX}${REVIEW_URL}`;

const SIGNOUT_URL = "/sign-out";
const API_SIGNOUT_URL = `${API_PREFIX}${SIGNOUT_URL}`;

const COUPON_URL = "/coupon";
const API_COUPON_URL = `${API_PREFIX}${COUPON_URL}`;

const BOOKING_REVIEW_INFO_URL = "/review-info/:bookingId";
const API_BOOKING_REVIEW_INFO_URL = `${API_PREFIX}${BOOKING_REVIEW_INFO_URL}`;

const INTERN_PAYMENT_URL = "/interns/payment";
const API_INTERN_PAYMENT_URL = `${API_PREFIX}${INTERN_PAYMENT_URL}`;

const COUPONS_URL = "/coupons";
const API_COUPONS_URL = `${API_PREFIX}${COUPONS_URL}`;

const INTERNS_URL = "/interns";
const API_INTERNS_URL = `${API_PREFIX}${INTERNS_URL}`;

const HOST_DASHBOARD_URL = "/host/dashboard";
const API_HOST_DASHBOARD_URL = `${API_PREFIX}${HOST_DASHBOARD_URL}`;

const DONATION_URL = "/payments/donate";
const API_DONATION_URL = `${API_PREFIX}${DONATION_URL}`;

const WITHDRAW_REQUEST_URL = "/payments/withdraw-request";
const API_WITHDRAW_REQUEST_URL = `${API_PREFIX}${WITHDRAW_REQUEST_URL}`;

const ORG_PAYMENT_URL = "/org/payment";
const API_ORG_PAYMENT_URL = `${API_PREFIX}${ORG_PAYMENT_URL}`;

module.exports = {
  // CLIENT
  API_LOGIN_URL,
  API_SIGNUP_URL,
  API_SIGNOUT_URL,
  API_USER_URL,
  API_CHECK_REFERRAL_URL,
  API_GET_ORGS_URL,
  API_HOST_COMPLETE_PROFILE,
  API_INTERN_COMPLETE_PROFILE,
  API_HOST_PROFILE_URL,
  API_INTERN_PROFILE_URL,
  API_BOOKING_REQUEST_URL,
  API_GET_USER_BOOKINGS_URL,
  API_GET_BOOKING_URL,
  API_SEARCH_PROFILES_URL,
  API_ADMIN_STATS_URL,
  API_VERIFY_PROFILE_URL,
  API_ORGS_DASHBOARD_URL,
  API_INTERN_DASHBOARD_URL,
  API_MY_PROFILE_URL,
  API_UPLOAD_SIGNED_URL,
  API_REVIEW_URL,
  API_COUPON_URL,
  API_GET_INTERN_STATUS,
  API_BOOKING_REVIEW_INFO_URL,
  API_INTERN_PAYMENT_URL,
  API_COUPONS_URL,
  API_INTERNS_URL,
  API_HOST_DASHBOARD_URL,
  API_DONATION_URL,
  API_WITHDRAW_REQUEST_URL,
  ORG_PAYMENT_URL,

  // SERVER
  LOGIN_URL,
  SIGNUP_URL,
  SIGNOUT_URL,
  USER_URL,
  CHECK_REFERRAL_URL,
  GET_ORGS_URL,
  HOST_COMPLETE_PROFILE,
  INTERN_COMPLETE_PROFILE,
  HOST_PROFILE_URL,
  INTERN_PROFILE_URL,
  BOOKING_REQUEST_URL,
  GET_USER_BOOKINGS_URL,
  GET_BOOKING_URL,
  SEARCH_PROFILES_URL,
  ADMIN_STATS_URL,
  VERIFY_PROFILE_URL,
  ORGS_DASHBOARD,
  INTERN_DASHBOARD_URL,
  MY_PROFILE_URL,
  UPLOAD_SIGNED_URL,
  REVIEW_URL,
  COUPON_URL,
  GET_INTERN_STATUS,
  BOOKING_REVIEW_INFO_URL,
  INTERN_PAYMENT_URL,
  COUPONS_URL,
  INTERNS_URL,
  HOST_DASHBOARD_URL,
  DONATION_URL,
  WITHDRAW_REQUEST_URL,
  API_ORG_PAYMENT_URL
};
