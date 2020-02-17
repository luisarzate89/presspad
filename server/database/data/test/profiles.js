const Profile = require('../../models/Profile');
const { types } = require('../../constants');
const user = require('./users');

const hostProfileData = {
  birthDate: Date.now() - 18 * 365 * 24 * 60 * 60 * 1000, // 18 years
  hometown: 'London',
  gender: types.gender[1], // male
  school: 'London Univ',
  bio:
    'This is Adam, and this is a bit of copy about him ... Thats not giving you a lot of detail, is it? I am 34 based in London with my wife and kids and would love to host you',
  profileImage: {
    fileName: 'adam-profile.jpg',
  },
  jobTitle: 'Journalist',
  organisation: 'Financial Times',
  workingArea: types.workingArea[0],
  hostingReasonAnswer:
    'I have worked in a similar capacity for four years. I enjoy meeting new people every day. Nothing makes my day contended than knowing that the patrons are happy because of my direct and indirect service.',
  mentoringExperienceAnswer:
    'In mentoring, that is best delivered when mentor and mentee go through the process as peers. While a mentor by definition needs to have specific knowledge that the other doesn’t, every mentoring experience I’ve been through has been thoroughly enlightening in hearing about the experiences of the other — whichever side I’ve been on. In many cases, I’m quite sure I have learned as much from my mentees as they have through my mentoring. I hope the same is true for my mentors.',
  industryExperienceAnswer:
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  backgroundAnswer:
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  photoID: {
    fileName: 'fake-photoID.png',
  },
  hearAboutPressPadAnswer: 'Throgh an ad on twitter and at work',
  phoneNumber: '004400000000000',
  DBSCheck: {
    fileName: 'fake-DBSCheck.pdf',
  },
  reference1: {
    name: 'Ramy Shurafa',
    email: 'ramyshurafa@hotmail.com',
  },
  reference2: {
    name: 'Ahmed Shatat',
    email: 'aboshatat@hotmail.com',
  },
  sexualOrientation: types.sexualOrientation[0],
  degreeLevel: types.degreeLevel[0],
  ethnicity: types.ethnicity[0],
  parentProfession: types.parentProfession[0],
  disability: types.disability[0],
  parentsWorkInPress: types.parentsWorkInPress[0],
  caringResponsibilities: 'no caring responsibilities',
  consentedOnPressPadTerms: true,
  verified: true,
};

const internProfileData = {
  birthDate: Date.now() - 18 * 365 * 24 * 60 * 60 * 1000, // 18 years
  gender: types.gender[1], // male
  hometown: 'Manchester',
  school: 'Manchester Univ',
  bio:
    'This is Mone, and this is a bit of copy about him ... Thats not giving you a lot of detail, is it? I am 34 based in London with my wife and kids and would love to host you',
  profileImage: {
    fileName: 'adam-profile.jpg',
  },
  interests: types.interests[0],
  organisation: 'Financial Times',
  useReasonAnswer:
    'I want to use PressPad because it matches young journalists with host-mentors and because it can offer me way much lower coasts than I ever would get by myself, I want to use it so hopefully, I can find the right mentor for me and continue my quest into becoming a famous person in this field.I need to get into journalism and work hard to get the best stories. You have to tell them as well as you can. You have to distinguish yourself for your work, study hard and read lots of documents. Over time you will be well known as a reliable professional. I can pick a side and shout opinions in favor of it as loud as you can. You don’t need to work hard for that, you just need to shout louder. Those guys are pretty famous nowadays, even if their work is worth shit. Cable channels may hire you, but competition for that is tough these days.',
  issueAnswer:
    "I don't want to tell you because I have someone annoying talking in my head now",
  storyAnswer:
    "Good journalism is so many things, but if I had to sum it up, it is being able to tell a story well and with accuracy. It's about picking up all the little details of a scenario that really gives it its flavour to help improve someone's understanding of it. It is very subtle. To tell a dramatic story, you do not need to use superlatives. The story will tell itself if you get the details in the right place. The right word, in the right place, is worth more than four sentences of bumbling explanation.",
  mentorDescribeAnswer:
    'Biker, nature enthusiast, guitarist, International Swiss style practitioner and front-end developer. Working at the crossroads of beauty and programing to create strong, lasting and remarkable design. I prefer clear logic to decoration.',
  photoID: {
    fileName: 'fake-photoID.png',
  },
  hearAboutPressPadAnswer: 'Throgh an ad on facebook and at work',
  phoneNumber: '004411111111111',
  reference1: {
    name: 'Ramy Shurafa',
    email: 'ramyshurafa@hotmail.com',
  },
  reference2: {
    name: 'Ahmed Shatat',
    email: 'aboshatat@hotmail.com',
  },
  offerLetter: {
    fileName: 'fake-offerletter.pdf',
  },
  internshipOfficeAddress: 'Portland PlaceLondonW1A 1AA',
  emergencyContact: {
    name: 'Simon Dupree',
    email: 'simon@yalla.com',
    phoneNumber: '0044010101010101',
  },
  DBSCheck: {
    fileName: 'fake-DBSCheck.pdf',
  },
  sexualOrientation: types.sexualOrientation[1],
  degreeLevel: types.degreeLevel[1],
  ethnicity: types.ethnicity[1],
  parentProfession: types.parentProfession[1],
  disability: types.disability[1],
  parentsWorkInPress: types.parentsWorkInPress[1],
  caringResponsibilities: 'no caring responsibilities',
  allergies: 'no allergies',
  backgroundAnswer:
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  consentedOnPressPadTerms: true,
};

const reset = () => Profile.deleteMany();

const createNew = async ({
  fillMissedFields = true,
  userData = {},
  profileData = {},
}) => {
  let newProfileData = {};
  if (fillMissedFields) {
    if (userData.role === 'intern') {
      newProfileData = { ...internProfileData };
    } else {
      newProfileData = { ...hostProfileData };
    }
  }

  const newUser = await user.createNew(userData);

  newProfileData = {
    ...newProfileData,
    ...profileData,
    user: newUser._id,
  };

  return Profile.create(newProfileData);
};

const createAll = async ({ users }) => {
  const { hostUser, internUser } = users;

  await reset();
  const host = { ...hostProfileData, user: hostUser };
  const intern = { ...internProfileData, user: internUser };
  const [hostProfile, internProfile] = await Profile.create([host, intern]);
  return { hostProfile, internProfile };
};

module.exports = {
  createAll,
  createNew,
  reset,
};
