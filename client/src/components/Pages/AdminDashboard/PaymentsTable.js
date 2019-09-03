import React from "react";
import { Table } from "antd";

import { columns, createDataSource } from "./config.PaymentsTable";

const PaymentsTable = ({ data, highlightVal }) => {
  const dataSource = createDataSource(data);
  return <Table dataSource={dataSource} columns={columns(highlightVal)} />;
};

export default PaymentsTable;
