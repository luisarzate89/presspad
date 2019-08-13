const mongoose = require("mongoose");

const ChecklistQuestion = require("../../../database/models/ChecklistQuestion");

const buildDB = require("../../../database/data/test");

describe("Test ChecklistQuestion schema", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("should ChecklistQuestion schema be defined", async () => {
    expect(ChecklistQuestion).toBeDefined();
  });

  test("should ChecklistQuestion schema store correctly", async (done) => {
    const checklistQuestion = {
      text: "Sign the contract",
      isPublic: true,
      for: "both",
    };

    const storedChecklistQuestion = await ChecklistQuestion.create(checklistQuestion);
    expect(storedChecklistQuestion).toBeDefined();

    expect(storedChecklistQuestion.text).toBe(storedChecklistQuestion.text);
    done();
  });
});
