const router = require('express').Router();

// IMPORT CONTROLLERS
const loginController = require('./../controllers/user/login');
const userInfo = require('./../controllers/user/userInfo');
const signUpController = require('./../controllers/user/signup');
const getAllOrgs = require('./../controllers/user/getAllOrgs');
const hostsCompleteProfile = require('./../controllers/hostsCompleteProfile');
const internsCompleteProfile = require('./../controllers/user/internsCompleteProfile');
const getHostProfile = require('./../controllers/profile/getHostProfile');
const hostViewInternProfile = require('./../controllers/profile/hostViewInternProfile');
const getInternProfile = require('./../controllers/profile/getInternProfile');
const searchProfiles = require('./../controllers/profile/searchProfiles');
const {
  viewBooking,
  getUserBookings,
  newBookingRequest,
  acceptBooking,
  rejectBooking,
} = require('./../controllers/booking');
const adminStats = require('./../controllers/stats/adminStats');
const verifyProfile = require('./../controllers/profile/verifyProfile');
const orgsDashboard = require('./../controllers/organisation/dashboard');
const {
  internDashboard,
  hostDashboard,
} = require('./../controllers/dashboard');
const getMyProfile = require('../controllers/profile/getMyProfile');
const { getUploadSignedURL } = require('../controllers/storage');
const { postReview, getReviews } = require('../controllers/review');
const signOut = require('../controllers/user/signOut');
const { getCoupons } = require('../controllers/coupon');
const getInternStatus = require('../controllers/profile/getInternStatus');
const { getBookingsWithUsers } = require('../controllers/Bookings');
const {
  internPayment,
  withdrawRequest,
  confirmOrCancelWithdrawRequest,
} = require('../controllers/payments');
const { createCoupon } = require('../controllers/coupons');
const getAllInterns = require('../controllers/user/getAllInterns');
const hostDonation = require('../controllers/payments/hostDonation');
const { orgPayment } = require('../controllers/payments/index');
const { getAllCities } = require('../controllers/listing');
const deletListingPhotos = require('../controllers/profile/deletListingPhotos');
const {
  updateChecklistAnswer,
  getChecklist,
} = require('../controllers/checklist');
const { markAsSeen } = require('../controllers/notifications');

// controller for admin to view all withdraw requests in presspad
const viewWithdrawRequests = require('../controllers/withdrawRequests');

// IMPORT MIDDLEWARES
const authentication = require('./../middlewares/authentication');
// const softAuthCheck = require("./../middlewares/softAuthCheck");
const { validation } = require('./../middlewares/validation');

// API ROUTES
const {
  LOGIN_URL,
  USER_URL,
  SIGNUP_URL,
  SIGNOUT_URL,
  GET_ORGS_URL,
  HOST_PROFILE_URL,
  HOST_COMPLETE_PROFILE,
  INTERN_COMPLETE_PROFILE,
  SEARCH_PROFILES_URL,
  BOOKING_REQUEST_URL,
  GET_USER_BOOKINGS_URL,
  GET_BOOKING_URL,
  ADMIN_STATS_URL,
  INTERN_PROFILE_URL,
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
  UPDATE_WITHDRAW_REQUEST_URL,
  ACCEPT_BOOKING_URL,
  REJECT_BOOKING_URL,
  ORG_PAYMENT_URL,
  FIND_WITHDRAW_REQUESTS_URL,
  GET_ALL_CETIES_URL,
  UPDATE_CHECKLIST_ANSWER,
  GET_CHECKLIST,
  ADMIN_INTERN_PROFILE,
  ADMIN_HOST_PROFILE,
  NOTIFICATION_URL,
  REVIEWS,
} = require('../../client/src/constants/apiRoutes');

// add validation middleware
router.use(validation);

// accept booking by id
router.patch(ACCEPT_BOOKING_URL, authentication, acceptBooking);

// accept booking by id
router.patch(REJECT_BOOKING_URL, authentication, rejectBooking);

// Host view intern profile
router.get(INTERN_PROFILE_URL, authentication, hostViewInternProfile);

// get HOST dashboard data
router.get(HOST_DASHBOARD_URL, authentication, hostDashboard);

// gets hosts profile data
router.get(HOST_PROFILE_URL, authentication, getHostProfile);

// update host profile and create new offer
router.post(HOST_COMPLETE_PROFILE, authentication, hostsCompleteProfile);

// delete the photo from the host listings
router.patch(HOST_COMPLETE_PROFILE, authentication, deletListingPhotos);

// update intern profile
router.post(INTERN_COMPLETE_PROFILE, authentication, internsCompleteProfile);

// get user info from the cookie if it exists and send to front end
router.get(USER_URL, authentication, userInfo);

// gets intern profile data
router.get(INTERN_PROFILE_URL, authentication, getInternProfile);

// approve or reject profile
router.post(VERIFY_PROFILE_URL, authentication, verifyProfile);

// check if user profile verfied and has coplete profile
router.get(GET_INTERN_STATUS, authentication, getInternStatus);

// creates new booking request
router.post(BOOKING_REQUEST_URL, newBookingRequest);

// view booking by id
router.get(GET_BOOKING_URL, authentication, viewBooking);

// get all user bookings
router.get(GET_USER_BOOKINGS_URL, getUserBookings);

// search for available listings
router.post(SEARCH_PROFILES_URL, searchProfiles);

// get stats for admin dashboard
router.post(ADMIN_STATS_URL, authentication, adminStats);

// USE CONTROLLERS
router.post(LOGIN_URL, loginController);
router.post(SIGNUP_URL, signUpController);
router.get(GET_ORGS_URL, getAllOrgs);

// Orgs
router.get(ORGS_DASHBOARD, authentication, orgsDashboard);

// Get intern dashboard
router.get(INTERN_DASHBOARD_URL, authentication, internDashboard);

// GET MY PROFILE
router.get(MY_PROFILE_URL, authentication, getMyProfile);

// GET INTERN PROFILE FOR ADMIN
router.get(ADMIN_INTERN_PROFILE, authentication, getMyProfile);

// GET HOST PROFILE FOR ADMIN
router.get(ADMIN_HOST_PROFILE, authentication, getMyProfile);

// Upload a file
router.get(UPLOAD_SIGNED_URL, authentication, getUploadSignedURL);

// ORG create a coupon
router.post(COUPONS_URL, authentication, createCoupon);

// admin || org get all interns
router.get(INTERNS_URL, authentication, getAllInterns);

// host donate to presspad
router.post(DONATION_URL, authentication, hostDonation);

// host request to withdraw money
router.post(WITHDRAW_REQUEST_URL, authentication, withdrawRequest);

// admin cancel or confirm request to withdraw money
router.patch(
  UPDATE_WITHDRAW_REQUEST_URL,
  authentication,
  confirmOrCancelWithdrawRequest,
);

// organisation add funds
router.post(ORG_PAYMENT_URL, authentication, orgPayment);

// Reviews
router.route(REVIEW_URL).post(authentication, postReview);

// Coupons
router.route(COUPON_URL).get(authentication, getCoupons);

// Signout
router.route(SIGNOUT_URL).get(signOut);

router.route(BOOKING_REVIEW_INFO_URL).get(authentication, getBookingsWithUsers);

router
  .route(FIND_WITHDRAW_REQUESTS_URL)
  .get(authentication, viewWithdrawRequests);

// payments
router.route(INTERN_PAYMENT_URL).post(authentication, internPayment);

router.get(GET_ALL_CETIES_URL, getAllCities);

// host | intern update the checklist answer
router.patch(UPDATE_CHECKLIST_ANSWER, authentication, updateChecklistAnswer);

// host | intern get the checklist for a booking
router.get(GET_CHECKLIST, authentication, getChecklist);

// [ host | intern | orgs ] mark their notifications as seen
router.patch(`${NOTIFICATION_URL}/seen`, authentication, markAsSeen);

// get reviews (given || taken)
router.get(REVIEWS, authentication, getReviews);
module.exports = router;
