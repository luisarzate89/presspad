module.exports = (req, res) => {
  const { user } = req;

  if (user) {
    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      organisation: user.organisation,
    });
  }

  return res.json({});
};
