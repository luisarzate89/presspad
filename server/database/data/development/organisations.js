const shortid = require("shortid");
const Organisation = require("../../models/Organisation");

module.exports = async () => {
  const organisations = [
    {
      name: "Financial Times",
      code: shortid.generate(),
      plan: "basic",
      credits: 500,
      logo: "http://www.pcalp.com/wp-content/uploads/2016/10/Financial_Times_corporate_logo.svg_.png",
    },
    {
      name: "The Guardian",
      code: shortid.generate(),
      plan: "basic",
      credits: 1500,
      logo: "http://planning.newsworks.org.uk/wp-content/uploads/2018/01/460x215-TheGuardian.png",
    },
    {
      name: "BBC",
      code: shortid.generate(),
      plan: "basic",
      credits: 750,
      logo: "https://thenetwork-group.com/assets/files/2014/12/BBC-logo.jpg",
    },
    {
      name: "AFP",
      code: shortid.generate(),
      plan: "basic",
      credits: 200,
      logo: "https://www.capitalfm.co.ke/news/files/2017/08/afp-logo.png",
    },
  ];

  await Organisation.create(organisations);
};
