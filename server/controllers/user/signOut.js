module.exports = (res, req, next) => {
  res
    .clearCookie("token")
    .json({ success: true });
};
