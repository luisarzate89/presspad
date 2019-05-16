const User = require("../../models/User");
const Profile = require("../../models/Profile");

module.exports = async () => {
  // add hosts
  const hosts = await User.find({ role: "host" });

  const hostProfiles = [
    {
      user: hosts[0],
      verified: true,
      bio:
        "This is Adam, and this is a bit of copy about him ... Thats not giving you a lot of detail, is it? I am 34 based in London with my wife and kids and would love to host you",
      interests: ["finances", "football", "writing"],
      organisation: {
        name: "Financial Times",
        website: "www.fa.com",
      },
      jobTitle: "Journalist",
      pressPass: "adam-presspass.jpg",
    },
    {
      user: hosts[1],
      verified: true,
      bio:
        "Hi my name is Eve. I am 25, living in Central London and working as a political journalist.",
      interests: ["politics", "fashion", "writing"],
      organisation: {
        name: "Reuters",
        website: "www.reuters.com",
      },
      jobTitle: "Political Journalist",
      pressPass: "eve-presspass.jpg",
    },
    {
      user: hosts[2],
      verified: true,
      bio:
        "Hi my name is Hilda. I am 45, living in North London and working at the Guardian in the sports department.",
      interests: ["sports", "drinking", "dancing"],
      organisation: {
        name: "Guardian",
        website: "www.guardian.co.uk",
      },
      jobTitle: "Sports Writer",
      pressPass: "eve-presspass.jpg",
    },
  ];

  await Profile.create(hostProfiles);
};
