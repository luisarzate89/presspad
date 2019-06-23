module.exports = {
  tokenMaxAge: {
    string: "30d",
    number: 2592000000,
  },
  multerFields: {
    hostCompleteProfile: [
      { name: "profileImage" },
      { name: "pressPass" },
      { name: "offerImages1" },
      { name: "offerImages2" },
      { name: "offerImages3" },
    ],
    internCompleteProfile: [
      { name: "profileImage" },
      { name: "pressPass" },
      { name: "offerLetter" },
      { name: "photoIDFile" },
    ],
  },
};
