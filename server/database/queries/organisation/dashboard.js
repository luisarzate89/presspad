const mongoose = require("mongoose");

const Organisation = require("./../../models/Organisation");

module.exports = (id) => {
  // details
  const b = Organisation.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(id) },
    },
    //  {
    //   $lookup: {
    //     from: "users",
    //     let: { orgId: "$_id" },
    //     pipeline: [
    //       {
    //         $match: { $expr: { $eq: ["$$orgId", "$organisation"] } },
    //       },
    //     ],
    //     as: "users",
    //   },
    // },
    // {
    //   $lookup: {
    //     from: "notifications",
    //     localField: "users._id",
    //     foreignField: "user",
    //     as: "notifications",
    //   },
    // },
    // {
    //   $lookup: {
    //     from: "users",
    //     localField: "notifications.secondParty",
    //     foreignField: "_id",
    //     as: "secondP",
    //   },
    // },
  ]);

  // notifications
  const c = Organisation.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: "users",
        let: { orgId: "$_id" },
        pipeline: [
          {
            $match: { $expr: { $eq: ["$$orgId", "$organisation"] } },
          },
        ],
        as: "users",
      },
    },
    {
      $unwind: "$users",
    },
    { $replaceRoot: { newRoot: "$users" } },
    {
      $lookup: {
        from: "notifications",
        localField: "_id",
        foreignField: "user",
        as: "notifications",
      },
    },
    {
      $unwind: "$notifications",
    },
    {
      $lookup: {
        from: "users",
        localField: "notifications.secondParty",
        foreignField: "_id",
        as: "secondP",
      },
    },
    {
      $project: {
        secondParty: {
          _id: { $arrayElemAt: ["$secondP._id", 0] },
          name: { $arrayElemAt: ["$secondP.name", 0] },
          email: { $arrayElemAt: ["$secondP.email", 0] },
          role: { $arrayElemAt: ["$secondP.role", 0] },
          organisation: { $arrayElemAt: ["$secondP.organisation", 0] },
        },
        user: {
          _id: "_id",
          name: "name",
          email: "email",
          role: "role",
          organisation: "organisation",
        },
        new: "$notifications.new",
        newForOrg: "$notifications.newForOrg",
        type: "$notifications.user",
        private: "$notifications.private",
        createdAt: "$notifications.createdAt",
      },
    },
  ]);


  // const a = Organisation.aggregate([
  //   {
  //     $match: { _id: mongoose.Types.ObjectId(id) },
  //   }, {
  //     $lookup: {
  //       from: "users",
  //       let: { orgId: "$_id" },
  //       pipeline: [
  //         {
  //           $match: { $expr: { $eq: ["$$orgId", "$organisation"] } },
  //         },
  //       ],
  //       as: "users",
  //     },
  //   },
  //   {
  //     $facet: {
  //       details: [
  //         {
  //           $project: {
  //             users: 0,
  //           },
  //         },
  //       ],
  //       users: [
  //         {
  //           $project: {
  //             "users.password": 0,
  //           },
  //         },
  //         {
  //           $project: {
  //             users: 1,
  //           },
  //         },
  //       ],
  //       notifications: [
  //         {
  //           $project: {
  //             users: 1,
  //             _id: 0,
  //           },
  //         }, {
  //           $unwind: "$users",
  //         },
  //         {
  //           $project: {
  //             _id: "$users._id",
  //             email: "$users.email",
  //             name: "$users.name",
  //           },
  //         },
  //         {
  //           $lookup: {

  //             from: "notifications",
  //             let: { user: "$_id" },
  //             pipeline: [
  //               {
  //                 $match: { $expr: { $and: [{ $eq: ["$$user", "$user"] }, { $eq: ["$private", false] }] } },
  //               },
  //             ],
  //             as: "notification",
  //           },
  //         }, {
  //           $unwind: "$notification",
  //         }, {
  //           $lookup: {
  //             from: "users",
  //             localField: "notification.secondParty",
  //             foreignField: "_id",
  //             as: "secondPartyInfo",
  //           },
  //         },
  //         {
  //           $project: {
  //             _id: "$notification._id",
  //             new: "$notification.new",
  //             newForOrg: "$notification.newForOrg",
  //             type: "$notification.type",
  //             createdAt: "$notification.createdAt",
  //             user: {
  //               _id: "$_id",
  //               email: "$email",
  //               name: "$name",
  //             },
  //             secondPartyInfo: {
  //               _id: "$secondPartyInfo._id",
  //               email: "$secondPartyInfo.email",
  //               name: "$secondPartyInfo.name",
  //               role: "$secondPartyInfo.role",
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   },
  // ]);
  const a = Organisation.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(id) },
    }, {
      $lookup: {
        from: "users",
        let: { orgId: "$_id" },
        pipeline: [
          {
            $match: { $expr: { $eq: ["$$orgId", "$organisation"] } },
          },
        ],
        as: "users",
      },
    }, {
      $unwind: "$users",
    },
    { $replaceRoot: { newRoot: "$users" } },
    {
      $lookup: {
        from: "transactions ",
        localField: "_id",
        foreignField: "sender",
        as: "transactions",
      },
    },
  ]);

  return Promise.all([a, b, c]);
};

// "_id": "5d0a301b8d45d26eef1c594b",
// "email": "simone@gmail.com",
// "name": "Simon Dupree",
// "notification": {
//     "_id": "5d0a301b8d45d26eef1c596d",
//     "new": true,
//     "private": false,
//     "newForOrg": true,
//     "user": "5d0a301b8d45d26eef1c594b",
//     "secondParty": "5d0a301a8d45d26eef1c5948",
//     "type": "stayApproved",
//     "createdAt": "2019-06-19T12:52:43.235Z",
//     "updatedAt": "2019-06-19T12:52:43.235Z",
//     "__v": 0
// },
// "secondPartyInfo": [
//     {
//         "_id": "5d0a301a8d45d26eef1c5948",
//         "email": "eve@hello.com",
//         "name": "Eve Richards",
//         "password": "$2a$08$diBJpvEJsyoHJox16j7IZOBBuyJ0XafWUYJU6hzvFiChreDPoaWle",
//         "role": "host",
//         "referral": "5d0a301a8d45d26eef1c5946",
//         "__v": 0
//     }
// ]
