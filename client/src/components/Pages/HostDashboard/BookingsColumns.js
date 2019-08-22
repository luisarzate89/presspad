import React from "react";
import moment from "moment";

export default windowWidth => {
  const columnsObject = [
    {
      title: "Itern",
      dataIndex: "intern.name",
      key: "intern._id"
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: text => moment(text).format("DD MMM YYYY")
    }
  ];

  if (windowWidth > 1000) {
    columnsObject.push({
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: text => moment(text).format("DD MMM YYYY")
    });
  }

  if (windowWidth > 800) {
    columnsObject.push({
      title: "Earnings",
      dataIndex: "price",
      key: "price",
      render: text => `£${Number(text).toFixed(2)}`
    });
  }

  return columnsObject;
};
