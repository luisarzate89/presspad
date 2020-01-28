const mongoose = require("mongoose");

const { ChecklistAnswer } = require("../../models");

/**
 * get Checklist answers and questions for a Host/Intern by userId
 * @param {string} userId the user Id "host"/"intern"
 * @param {string} bookingId the booking id
 * @returns {promise} (use .exec() to make it fully fledge)
 */
module.exports = (userId, bookingId) =>
  ChecklistAnswer.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { $eq: [mongoose.Types.ObjectId(bookingId), "$booking"] },
            { $eq: [mongoose.Types.ObjectId(userId), "$user"] },
          ],
        },
      },
    },
    // get the question text
    {
      $lookup: {
        from: "checklistquestions",
        let: { questionId: "$question" },
        pipeline: [
          { $match: { $expr: { $eq: ["$$questionId", "$_id"] } } },
          {
            $project: {
              text: 1,
              containsHostEmail: 1,
              containsInternEmail: 1,
              hintText: 1,
              links: 1,
              isOptional: 1,
            },
          },
        ],
        as: "question",
      },
    },
    {
      $unwind: {
        path: "$question",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);
