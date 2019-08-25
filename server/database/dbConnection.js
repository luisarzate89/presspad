const mongoose = require("mongoose");

// read the config file
require("dotenv").config();


let mongoURI = process.env.MONGO_URI;

if (process.env.NODE_ENV === "test") {
  // change mongoURI to testing database URI
  mongoURI = process.env.MONGOURI_TEST;
} else if (process.env.NODE_ENV === "production") {
  // change mongoURI to testing database URI
  mongoURI = process.env.MONGO_URI_PROD;
}


// create DB connection
const dbConnection = (atlasLink) => {
  console.log(atlasLink);
  return mongoose.connect(atlasLink || mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
};
module.exports = dbConnection;
