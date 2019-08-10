const mongoose = require("mongoose");

const ChecklistQuestion = require("../../../database/models/ChecklistQuestion");
const ChecklistAnswer = require("../../../database/models/ChecklistAnswer");
const Booking = require("../../../database/models/Booking");

const buildDB = require("../../../database/data/test");

describe("Test ChecklistAnswer schema", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("should ChecklistAnswer schema be defined", async () => {
    expect(ChecklistAnswer).toBeDefined();
  });

  test("should ChecklistAnswer schema store correctly", async (done) => {
    const checklistQuestions = await ChecklistQuestion.find();
    const bookings = await Booking.find();

    const checklistAnswer = {
      user: bookings[0].host,
      question: checklistQuestions[1]._id,
      isChecked: true,
      booking: bookings[0]._id,
    };

    const storedChecklistAnswer = await ChecklistAnswer.create(checklistAnswer);
    expect(storedChecklistAnswer).toBeDefined();

    expect(storedChecklistAnswer.isChecked).toBe(storedChecklistAnswer.isChecked);
    done();
  });
});
