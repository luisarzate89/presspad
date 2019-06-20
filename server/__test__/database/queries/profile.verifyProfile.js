const mongoose = require("mongoose");
const buildDB = require("../../../database/data/test/index");
const Profile = require("../../../database/models/Profile");

// get query
const { approveRejectProfile } = require("../../../database/queries/profile/verifyProfile.js");

describe("Tests verifying profiles", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Approve a profile", async (done) => {
    const profile = await Profile.findOne({ verified: false });

    await approveRejectProfile(profile.id, true).then(async (results) => {
      expect(results).toBeDefined();
      const updatedProfile = await Profile.findById(profile.id);
      expect(updatedProfile.verified).toBe(true);
    });
    done();
  });

  test("Unapprove a profile", async (done) => {
    const profile = await Profile.findOne({ verified: true });

    await approveRejectProfile(profile.id, false).then(async (results) => {
      expect(results).toBeDefined();
      const updatedProfile = await Profile.findById(profile.id);
      expect(updatedProfile.verified).toBe(false);
    });
    done();
  });
});
