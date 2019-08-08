module.exports = {
  tokenMaxAge: {
    string: "30d",
    number: 2592000000,
  },
  multerFields: {
    hostCompleteProfile: [
      { name: "profileImage" },
      { name: "offerImages1" },
      { name: "offerImages2" },
      { name: "offerImages3" },
    ],
    internCompleteProfile: [
      { name: "profileImage" },
      { name: "offerLetter" },
      { name: "photoIDFile" },
    ],
  },
};
