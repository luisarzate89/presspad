const mongoose = require("mongoose");

const resetDB = async () => {
  try {
    const { connection } = mongoose;
    const collections = await connection.db.listCollections({}, { nameOnly: true }).toArray();

    const promises = collections.map(({ name }) => connection.dropCollection(name));
    await Promise.all(promises);
  } catch (err) {
    console.log("Error during resting the db, try again", err);
  }
};

module.exports = resetDB;
