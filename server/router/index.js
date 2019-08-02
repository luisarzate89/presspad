const router = require("express").Router();

// IMPORT CONTROLLERS
const loginController = require("./../controllers/user/login");
const userInfo = require("./../controllers/user/userInfo");
const signUpController = require("./../controllers/user/signup");
const getUserByReferral = require("./../controllers/user/getUserByReferral");
const getAllOrgs = require("./../controllers/user/getAllOrgs");
const hostsCompleteProfile = require("./../controllers/hostsCompleteProfile");
const internsCompleteProfile = require("./../controllers/user/internsCompleteProfile");
const getHostProfile = require("./../controllers/profile/getHostProfile");
const getInternProfile = require("./../controllers/profile/getInternProfile");
const searchProfiles = require("./../controllers/profile/searchProfiles");
const newBookingRequest = require("./../controllers/newBookingRequest");
const getUserBookings = require("./../controllers/getUserBookings");
const adminStats = require("./../controllers/stats/adminStats");
const verifyProfile = require("./../controllers/profile/verifyProfile");
const orgsDashboard = require("./../controllers/organisation/dashboard");
const { getUploadSignedURL } = require("../controllers/storage");
const { createReview } = require("../controllers/review");

// IMPORT MIDDLEWARES
const authentication = require("./../middlewares/authentication");
const softAuthCheck = require("./../middlewares/softAuthCheck");
const multer = require("./../middlewares/multer");
const googleStorage = require("./../middlewares/googleStorage");
const deleteFromServer = require("./../middlewares/deleteFromServer");

// API ROUTES
const {
  LOGIN_URL,
  USER_URL,
  SIGNUP_URL,
  CHECK_REFERRAL_URL,
  GET_ORGS_URL,
  HOST_PROFILE_URL,
  HOST_COMPLETE_PROFILE,
  INTERN_COMPLETE_PROFILE,
  SEARCH_PROFILES_URL,
  BOOKING_REQUEST_URL,
  ADMIN_STATS_URL,
  GET_BOOKINGS_URL,
  INTERN_PROFILE_URL,
  VERIFY_PROFILE_URL,
  ORGS_DASHBOARD,
  UPLOAD_SIGNED_URL,
  REVIEW_URL,
} = require("../../client/src/constants/apiRoutes");

// CONSTANTS
const { multerFields } = require("./../constants");

const { hostCompleteProfile, internCompleteProfile } = multerFields;

// update host profile and create new offer
router.post(
  HOST_COMPLETE_PROFILE,
  softAuthCheck,
  multer(hostCompleteProfile),
  googleStorage(),
  deleteFromServer(),
  hostsCompleteProfile,
);

// update intern profile
router.post(
  INTERN_COMPLETE_PROFILE,
  softAuthCheck,
  multer(internCompleteProfile),
  googleStorage(),
  deleteFromServer(),
  internsCompleteProfile,
);

// get user info from the cookie if it exists and send to front end
router.get(USER_URL, softAuthCheck, userInfo);

// gets hosts profile data
router.post(HOST_PROFILE_URL, getHostProfile);

// gets intern profile data
router.post(INTERN_PROFILE_URL, getInternProfile);

// approve or reject profile
router.post(VERIFY_PROFILE_URL, authentication, verifyProfile);

// creates new booking request
router.post(BOOKING_REQUEST_URL, newBookingRequest);

// creates new booking request
router.get(GET_BOOKINGS_URL, getUserBookings);

// search for available listings
router.post(SEARCH_PROFILES_URL, searchProfiles);

// get stats for admin dashboard
router.post(ADMIN_STATS_URL, authentication, adminStats);

// USE CONTROLLERS
router.post(LOGIN_URL, loginController);
router.post(SIGNUP_URL, signUpController);
router.post(CHECK_REFERRAL_URL, getUserByReferral);
router.get(GET_ORGS_URL, getAllOrgs);

// Orgs
router.get(ORGS_DASHBOARD, authentication, orgsDashboard);

// Upload a file
router.get(UPLOAD_SIGNED_URL, authentication, getUploadSignedURL);

// Reviews
router.route(REVIEW_URL)
  .post(
    authentication,
    createReview,
  );

module.exports = router;
