const User = require("../../models/User");
const Profile = require("../../models/Profile");

module.exports = async () => {
  // add hosts
  const hosts = await User.find({ role: "host" }).sort({ name: 1 });

  const hostProfiles = [
    {
      user: hosts[0],
      verified: true,
      bio:
        "This is Adam, and this is a bit of copy about him ... Thats not giving you a lot of detail, is it? I am 34 based in London with my wife and kids and would love to host you",
      interests: "finances, football, writing",
      organisation: {
        name: "Financial Times",
        website: "www.fa.com",
      },
      jobTitle: "Journalist",
      profileImage: {
        fileName: "adam-profile.jpg",
      },
    },
    {
      user: hosts[1],
      verified: true,
      bio:
        "Hi my name is Eve. I am 25, living in Central London and working as a political journalist.",
      interests: "politics, fashion, writing",
      organisation: {
        name: "Reuters",
        website: "www.reuters.com",
      },
      jobTitle: "Political Journalist",
    },
    {
      user: hosts[2],
      verified: true,
      bio:
        "Hi my name is Hilda. I am 45, living in North London and working at the Guardian in the sports department.",
      interests: "sports, drinking, dancing",
      organisation: {
        name: "Guardian",
        website: "www.guardian.co.uk",
      },
      jobTitle: "Sports Writer",
    },
    {
      user: hosts[3],
      verified: false,
      bio:
        "Hi my name is Simon. I am living a little bit far out of London and working with a great media & development agency.",
      interests: "surfing, music",
      organisation: {
        name: "Yalla",
        website: "www.yallacooperative.com",
      },
      jobTitle: "Content Writer",
    },
  ];

  await Profile.create(hostProfiles);

  // add interns
  const interns = await User.find({ role: "intern" }).sort({ name: 1 });
  const [joe, mone, , ramy] = interns;

  const internProfiles = [
    {
      user: mone,
      verified: true,
      bio:
        "Hi I'm Mone and I'm starting an internship at the AFP any time soon. Would love to find a nice place to stay at.",
      jobTitle: "Journalist",
      profileImage: {
        fileName: "mone-profile.jpg",
      },
      favouriteArticle: {
        title: "A story about techno",
        author: "Raver Joseph",
        link: "www.guardian.com/1314141asfas",
        description:
          "I found Nicky’s article on blockchain in politics to be amazingly written. Not only does he unearth the most pressing issues blockchain could fix, but he also shows why it’s not happening yet. Blockchain is not a term you usually see in politics, but moving away from the buzzword and looking at the actual applications, Nicky manages to tell the story of how it could do a lot of good to Georgians.",
      },
      verification: {
        photoID: {
          fileName: "mone-photoID.png",
        },
        offerLetter: "mone-offer-letter.jpg",
        reference1:
          {
            name: "Yalla Master",
            contact: "014251521, hello@yalla.com",
          },
        reference2: {
          name: "Mister Myagi",
          contact: "Bricklane 102 London, mobile: 0125215215",
        },

      },
    },
    {
      user: joe,
      verified: true,
      bio:
        "Hi I'm Joe and I'm starting an internship at the BBC. Would love to find an awesome place to stay at.",
      jobTitle: "Music Journalist",
      profileImage: {
        fileName: "joe-image.jpg",
      },
      favouriteArticle: {
        title: "French Nancy - good times",
        author: "Solo Chief",
        link: "www.fa.com/1314141as21421as",
        description:
          "I found Nicky’s article on blockchain in politics to be amazingly written. Not only does he unearth the most pressing issues blockchain could fix, but he also shows why it’s not happening yet. Blockchain is not a term you usually see in politics, but moving away from the buzzword and looking at the actual applications, Nicky manages to tell the story of how it could do a lot of good to Georgians.",
      },
      verification: {
        photoID: {
          fileName: "joe-photoID.png",
        },
        offerLetter: "joe-offer-letter.jpg",
        reference1:
          {
            name: "Yalla Master",
            contact: "014251521, hello@yalla.com",
          },
        reference2: {
          name: "Mister Myagi",
          contact: "Bricklane 102 London, mobile: 0125215215",
        },

      },
    },
    {
      user: ramy,
      verified: true,
      bio:
        "Hi I'm Ramy and I'm starting an internship at the FA. Would love to find an cosy place to stay at.",
      jobTitle: "Coding Journalist",
      profileImage: {
        fileName: "ramy-image.jpg",
      },
      favouriteArticle: {
        title: "MongoDB is for cool kids",
        author: "Professor Mongo",
        link: "www.fa.com/1314sada22s",
        description:
          "I found Nicky’s article on blockchain in politics to be amazingly written. Not only does he unearth the most pressing issues blockchain could fix, but he also shows why it’s not happening yet. Blockchain is not a term you usually see in politics, but moving away from the buzzword and looking at the actual applications, Nicky manages to tell the story of how it could do a lot of good to Georgians.",
      },
      verification: {
        photoID: {
          fileName: "ramy-photoID.png",
        },
        offerLetter: "ramy-offer-letter.jpg",
        reference1:
          {
            name: "Yalla Master",
            contact: "014251521, hello@yalla.com",
          },
        reference2: {
          name: "Mister Myagi",
          contact: "Bricklane 102 London, mobile: 0125215215",
        },
      },
    },
  ];

  await Profile.create(internProfiles);
};
