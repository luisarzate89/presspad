const mongoose = require('mongoose');
const {
  MongoMemoryServer,
  MongoMemoryReplSet,
} = require('mongodb-memory-server');

module.exports = async (options = {}) => {
  const { replSet } = options;
  let mongoServer;

  if (replSet) {
    mongoServer = new MongoMemoryReplSet({
      debug: false,
      replSet: { storageEngine: 'wiredTiger' },
    });
    await mongoServer.waitUntilRunning();
  } else {
    mongoServer = new MongoMemoryServer();
  }

  mongoose.Promise = Promise;
  mongoose.set('useCreateIndex', true);

  const mongoUri = await mongoServer.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(mongoUri, mongooseOpts);
  return { connection: mongoose.connection, mongoServer };
};
