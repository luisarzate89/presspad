// config file for the antd table "PaymentsTable"
import React from "react";
import { Checkbox } from "antd";

const CheckBoxJsx = props => {
  return props.paymentStatus === "transfered" ? (
    <Checkbox disabled checked={true} />
  ) : (
    <Checkbox disabled checked={false} />
  );
};

/**
 * @param {Array} array the array of withdraw requests receied in the axios api call.
 * @return {Array} returns array of datasource objects to populate the antd table.
 */
const createDataSource = array => {
  return array.map(item => {
    const dataItem = {
      key: item._id,
      host: item.user.name,
      amount: item.amount.toString(),
      paid: <CheckBoxJsx key={item._id} paymentStatus={item.status} />,
      bank: item.bankName,
      account: item.accountNumber,
      sortCode: item.bankSortCode
    };
    return dataItem;
  });
};

const columns = [
  {
    title: "Host",
    dataIndex: "host",
    key: "host",
    className: "mainCol"
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount"
  },
  {
    title: "Paid",
    dataIndex: "paid",
    key: "paid"
  },
  {
    title: "Bank Name",
    dataIndex: "bank",
    key: "bank"
  },
  {
    title: "Account Number",
    dataIndex: "account",
    key: "account"
  },
  {
    title: "Sort Code",
    dataIndex: "sortCode",
    key: "sortCode"
  }
];

export { columns, createDataSource };
