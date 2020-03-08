const Listing = require('../../models/Listing');
const { types } = require('../../constants');

const profiles = require('./profiles');

const defaultListingData = {
  address: {
    addressline1: '21 Roding Road',
    addressline2: '22 Roding Road',
    city: 'London',
    postcode: 'E50DW',
  },
  neighbourhoodDescription:
    'Colourful artwork adorns the walls throughout this curated interior, designed by one of Londons premier architects. Find inspiration in an urban minimalist home with wood finishes, original details, and chic furnishings throughout.',

  otherInfo: 'thats all there is no other info',
  accommodationChecklist: [
    types.accommodationChecklist[0],
    types.accommodationChecklist[1],
    types.accommodationChecklist[2],
  ],
  photos: [
    {
      fileName: '5e2c87f84041d47b78b8b69a/1579977401128.ali1.webp',
      isPrivate: false,
    },
    {
      fileName: '5e2c87f84041d47b78b8b69a/1579977403930.ali2.webp',
      isPrivate: false,
    },
    {
      fileName: '5e2c87f84041d47b78b8b69a/1579977407411.ali3.webp',
      isPrivate: false,
    },
  ],

  availableDates: [
    {
      startDate: Date.now() + 1 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 8 * 24 * 60 * 60 * 1000,
    },
    {
      startDate: Date.now() + 14 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 22 * 24 * 60 * 60 * 1000,
    },
  ],
};

const reset = () => Listing.deleteMany();

const createNew = async ({ fillMissedFields = true, listingData = {} }) => {
  let newListingData = {};

  if (fillMissedFields) {
    newListingData = { ...defaultListingData };
  }

  newListingData = { ...newListingData, ...listingData };

  const newProfile = await profiles.createNew({ userData: { role: 'host' } });
  newListingData.user = newProfile.user;

  return Listing.create(newListingData);
};

const createAll = async ({ users }) => {
  const { hostUser } = users;

  await reset();
  const listings = [{ ...defaultListingData, user: hostUser }];
  const [LondonListing] = await Listing.create(listings);
  return { LondonListing };
};

module.exports = {
  createAll,
  createNew,
  reset,
};
