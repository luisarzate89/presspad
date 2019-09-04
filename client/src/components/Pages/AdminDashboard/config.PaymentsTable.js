// config file for the antd table "PaymentsTable"
import React from "react";
import { Icon, Button, Popconfirm } from "antd";

import { colors } from "../../../theme";

const CheckBoxJsx = ({ paymentStatus }) => {
  switch (paymentStatus) {
    case "transfered":
      return (
        <Icon type="check-circle" theme="twoTone" twoToneColor={colors.green} />
      );
    case "canceled":
      return (
        <Icon
          type="close-circle"
          theme="twoTone"
          twoToneColor={colors.orange}
        />
      );
    case "rejected":
      return <Icon type="stop" theme="twoTone" twoToneColor={colors.red} />;
    default:
      return (
        <Icon
          type="info-circle"
          theme="twoTone"
          twoToneColor={colors.lightBlue}
        />
      );
  }
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

const columns = handleClick => [
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
  },
  {
    dataIndex: "key",
    render: (id, record) => (
      <>
        <Popconfirm
          title={`Confirm transfer request to ${record.host}`}
          onConfirm={() => handleClick(id, "transfered")}
        >
          <Button type="primary" ghost style={{ marginRight: "0.6rem" }}>
            Transfered
          </Button>
        </Popconfirm>
        <Popconfirm
          title={`Cancel transfer request to ${record.host}`}
          onConfirm={() => handleClick(id, "canceled")}
        >
          <Button type="danger" ghost>
            Cancel
          </Button>
        </Popconfirm>
      </>
    )
  }
];

export { columns, createDataSource };
