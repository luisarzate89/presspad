// config file for the antd table "PaymentsTable"
import React from "react";
import { Checkbox } from "antd";
import Highlighter from "react-highlight-words";

import { colors } from "../../../theme";

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

const columns = highlightVal => [
  {
    title: "Host",
    dataIndex: "host",
    key: "host",
    className: "mainCol",
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
        searchWords={[highlightVal]}
        autoEscape={true}
        textToHighlight={text.toString()}
      />
    )
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
        searchWords={[highlightVal]}
        autoEscape={true}
        textToHighlight={text.toString()}
      />
    )
  },
  {
    title: "Paid",
    dataIndex: "paid",
    key: "paid"
  },
  {
    title: "Bank Name",
    dataIndex: "bank",
    key: "bank",
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
        searchWords={[highlightVal]}
        autoEscape={true}
        textToHighlight={text.toString()}
      />
    )
  },
  {
    title: "Account Number",
    dataIndex: "account",
    key: "account",
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
        searchWords={[highlightVal]}
        autoEscape={true}
        textToHighlight={text.toString()}
      />
    )
  },
  {
    title: "Sort Code",
    dataIndex: "sortCode",
    key: "sortCode",
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
        searchWords={[highlightVal]}
        autoEscape={true}
        textToHighlight={text.toString()}
      />
    )
  }
];

export { columns, createDataSource };
