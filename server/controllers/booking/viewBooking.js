module.exports = (req, res, next) => {
  console.log(req.params);
  res.json({ data: req.body });
};
