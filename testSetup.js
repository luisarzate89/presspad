const mongoose = require("mongoose");

const buildDb = require("./server/database/data/test");

beforeAll(async (done) => {
  jest.setTimeout(20000);
  try {
    if (mongoose.connection.readyState === 0) {
      const newConnection = () => mongoose.connect(`mongodb://localhost:27017/${process.env.TEST_SUITE}`, { useNewUrlParser: true, useCreateIndex: true });
      await buildDb(newConnection);
      done();
    } else {
      await buildDb();
      done();
    }
  } catch (error) {
    done(error);
  }
});

afterAll(async (done) => {
  await mongoose.disconnect();
  done();
});
