const mongoose = require('mongoose');

// read the config file
require('dotenv').config();

mongoose.Promise = global.Promise;

let mongoURI = process.env.MONGO_URI;

const mongoURIAtlas = process.env.MONGOURI_ATLAS;
if (process.env.NODE_ENV === 'test') {
  // change mongoURI to testing database URI
  mongoURI = process.env.MONGOURI_TEST;
} else if (process.env.NODE_ENV === 'production') {
  // change mongoURI to testing database URI
  mongoURI = process.env.MONGO_URI_PROD;
}

/**
 * create DB connection
 * @param {Boolean} useAtlas - true to use atlas DB
 */
const dbConnection = useAtlas =>
  mongoose.connect(useAtlas ? mongoURIAtlas : mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
module.exports = dbConnection;
