const mongoose = require('mongoose');

const dbConnection = require('../../dbConnection');
const createEmptyCollection = require('./../createEmptyCollection');

const accounts = require('./accounts');
const users = require('./users');
const checklistQuestions = require('./checklistQuestions');
const resetDb = require('./resetDb');

const buildProdData = () =>
  new Promise((resolve, reject) => {
    dbConnection()
      .then(async () => {
        await resetDb();
        await createEmptyCollection();
        await accounts();
        await users();
        await checklistQuestions();
      })
      .then(resolve)
      .catch(reject);
  });

buildProdData().then(() => {
  // eslint-disable-next-line no-console
  console.log('Done!: Production DB has been built successfully');
  // close the connection after build
  mongoose.disconnect();
});
