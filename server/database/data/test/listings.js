const User = require('../../models/User');
const Listing = require('../../models/Listing');

module.exports = async () => {
  const hosts = await User.find({ role: 'host' }).sort({ name: 1 });

  const listings = [
    {
      user: hosts[0],
      address: {
        street: '21 Roding Road',
        borough: 'Homerton',
        city: 'London',
        postcode: 'E50DW',
      },
      description:
        'Colourful artwork adorns the walls throughout this curated interior, designed by one of Londons premier architects. Find inspiration in an urban minimalist home with wood finishes, original details, and chic furnishings throughout.',
      otherInfo: [
        'Pets allowed',
        'No other flatmates',
        'LGBTQ friendly',
        'Often away',
      ],
      price: 30,
      photos: [
        {
          fileName: 'test-image-1.png',
          isPrivate: false,
        },
        {
          fileName: 'test-image-2.png',
          isPrivate: false,
        },
        {
          fileName: 'test-image-3.png',
          isPrivate: false,
        },
      ],
      availableDates: [
        { startDate: '2019-05-16', endDate: '2019-07-16' },
        { startDate: '2019-09-14', endDate: '2019-10-12' },
      ],
    },
    {
      user: hosts[1],
      address: {
        street: '21 Central Road',
        borough: 'Hyde Park',
        city: 'London',
        postcode: 'W22UH',
      },
      description:
        'Amazing Location by Hyde Park! Comfortable Double Studio Apartment on 2nd Floor with Private EN suite shower room. Newly Refurbished Sleeps 2 persons. Free High Speed WIFI. Fresh Linen/Towels. Equipped Kitchenette. Communal Laundry Facilities. Excellent Location. Great Transport links! Ideal for solo adventurers, Couples or business travellers.',
      otherInfo: [
        'Pets not allowed',
        'No Smoking',
        'Relaxed vibe',
        'Often away',
      ],
      price: 20,
      photos: [],
      availableDates: [
        { startDate: '2019-04-16', endDate: '2019-09-16' },
        { startDate: '2019-12-14', endDate: '2020-02-12' },
      ],
    },
    {
      user: hosts[2],
      address: {
        street: '300 Hackney Road',
        borough: 'Hackney',
        city: 'London',
        postcode: 'E16AW',
      },
      description:
        'We offer a single room for one person in our East London terraced house. The house is close to two tube stations that take you into Central London in less than 30 minutes. There are numerous shops, cafes, and takeaways in walking distance. Our house is safe and clean. This space is ideal for anyone visiting London on a budget.',
      otherInfo: [
        'Parties not allowed',
        'Smoking',
        'Cleaning fee',
        'Often away',
      ],
      price: 35,
      photos: [],
      availableDates: [
        { startDate: '2019-04-16', endDate: '2019-05-16' },
        { startDate: '2019-06-14', endDate: '2020-06-19' },
        { startDate: '2019-08-14', endDate: '2020-09-12' },
        { startDate: '2019-10-14', endDate: '2020-12-12' },
      ],
    },
    {
      user: hosts[3],
      address: {
        street: '28 Test Road',
        borough: 'Hackney',
        city: 'Manchester',
        postcode: 'M95EW',
      },
      description:
        'We offer a single room for one person in our Manchester terraced house. The house is close to two tube stations that take you into Central London in less than 30 minutes. There are numerous shops, cafes, and takeaways in walking distance. Our house is safe and clean. This space is ideal for anyone visiting London on a budget.',
      otherInfo: [
        'Parties not allowed',
        'Smoking',
        'Cleaning fee',
        'Often away',
      ],
      price: 35,
      photos: [],
      availableDates: [{ startDate: '2019-10-14', endDate: '2020-12-12' }],
    },
  ];
  await Listing.create(listings);
};
