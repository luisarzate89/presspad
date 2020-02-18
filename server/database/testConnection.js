const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = () =>
  new Promise((resolve, reject) => {
    const mongoServer = new MongoMemoryServer();

    mongoose.Promise = Promise;
    mongoose.set('useCreateIndex', true);

    mongoServer.getUri().then(mongoUri => {
      const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

      mongoose.connect(mongoUri, mongooseOpts);

      mongoose.connection.on('error', e => {
        if (e.message.code === 'ETIMEDOUT') {
          mongoose.connect(mongoUri, mongooseOpts);
        }
        reject(e);
      });

      mongoose.connection.once('open', () => {
        resolve(mongoose.connection);
      });
    });
  });
