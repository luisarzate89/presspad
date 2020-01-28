const mongoose = require("mongoose");

// Higher order function
// runs the wrapped function in transaction session
const withTransaction = wrappedFunction => async () => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    await wrappedFunction(session);

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

module.exports = withTransaction;
