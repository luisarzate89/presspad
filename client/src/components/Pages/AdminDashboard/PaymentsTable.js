import React from "react";
import { Table } from "antd";

import { columns, createDataSource } from "./config.PaymentsTable";

const PaymentsTable = ({ data, highlightVal, handleConfirm, loading }) => {
  const dataSource = loading ? [] : createDataSource(data);

  return (
    <Table
      dataSource={dataSource}
      columns={columns(highlightVal, handleConfirm)}
      loading={loading}
    />
  );
};

export default PaymentsTable;
