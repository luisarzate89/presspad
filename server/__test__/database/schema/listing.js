const mongoose = require("mongoose");

const User = require("../../../database/models/User");
const Listing = require("../../../database/models/Listing");
const buildDB = require("../../../database/data/test");

describe("Test Listing schema", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("Listing schema should be defined", async () => {
    expect(Listing).toBeDefined();
  });

  test("should store Listing schema correctly", async (done) => {
    const listings = await Listing.find();
    expect(listings).toHaveLength(3);
    done();
  });

  test("should store a new Listing correctly", async (done) => {
    const hosts = await User.find({ role: "host" });

    const newListing = {
      user: hosts[0],
      address: {
        street: "21 Roding Road",
        borough: "Homerton",
        city: "London",
        postcode: "E50DW",
      },
      description:
        "Colourful artwork adorns the walls throughout this curated interior, designed by one of Londons premier architects. Find inspiration in an urban minimalist home with wood finishes, original details, and chic furnishings throughout.",
      otherInfo: ["Pets allowed", "No other flatmates", "LGBTQ friendly", "Often away"],
      price: 30,
      photos: ["1livingroom.jpg", "1kitchen.jpg", "1bathroom.jpg"],
      availableDates: [
        { startDate: "2019-05-16", endDate: "2019-07-16" },
        { startDate: "2019-09-14", endDate: "2019-10-12" },
      ],
    };
    const storedListing = await Listing.create(newListing);
    expect(storedListing).toBeDefined();

    done();
  });
});
