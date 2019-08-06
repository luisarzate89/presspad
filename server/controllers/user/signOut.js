module.exports = (req, res, next) => {
  res
    .clearCookie("token")
    .json({ success: true });
};
