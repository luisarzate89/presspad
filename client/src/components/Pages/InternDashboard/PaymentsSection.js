import React from "react";
import { Table } from "antd";

import moment from "moment";

import { SectionTitle } from "./InternDashboard.style";
import { SectionWrapperContent } from "../../Common/general";

const columns = [
  {
    title: "Due date",
    dataIndex: "dueDate",
    render: (text, record) => {
      return <span>{moment(record.dueDate).format("DD MMM YYYY")}</span>;
    }
  },
  {
    title: "Amount due",
    dataIndex: "amount",
    render: (text, record) => {
      return <span>£{record.amount.toFixed(2)}</span>;
    }
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text, record) => {
      if (record.transaction) {
        return <span>Paid</span>;
      }
      return <span>Not Paid</span>;
    }
  }
];

export default function PaymentsSection(props) {
  return (
    <section>
      <SectionWrapperContent style={{ minHeight: 200 }}>
        <SectionTitle>Requested Payments</SectionTitle>
        <Table
          dataSource={props.data}
          columns={columns}
          rowKey={record => record._id}
        />
      </SectionWrapperContent>
    </section>
  );
}
