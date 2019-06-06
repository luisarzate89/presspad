const User = require("../../models/User");
const Review = require("../../models/Review");

module.exports = async () => {
  const hosts = await User.find({ role: "host" });
  const interns = await User.find({ role: "intern" });

  const reviews = [
    {
      to: hosts[0],
      from: interns[1],
      rating: 4,
      message: "My stay was perfect!",
    },
    {
      to: hosts[0],
      from: interns[2],
      rating: 5,
      message:
        "Staying here was an absolute pleasure. I learned a great deal about how to approach politicians and very much enjoyed the city. We managed to go to a few journalistic events as well and met some amazing people!",
    },
    {
      to: interns[0],
      from: hosts[1],
      rating: 5,
      message: "It all went very well! We had a great time together.",
    },
  ];
  await Review.create(reviews);
};
