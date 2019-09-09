const boom = require("boom");
const { getAllCities } = require("../../database/queries/listing");

exports.getAllCities = async (req, res, next) => {
  try {
    const cities = await getAllCities();
    res.json(cities);
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
