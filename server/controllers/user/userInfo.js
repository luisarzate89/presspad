module.exports = (req, res) => {
  const { user } = req;

  if (user) {
    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }

  return res.json({});
};
