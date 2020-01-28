import React from "react";
import { Table } from "antd";

import { paymentsColumns } from "./TablesColumns";

import { SectionTitle } from "./InternDashboard.style";
import { SectionWrapperContent } from "../../Common/general";

export default function PaymentsSection(props) {
  return (
    <section>
      <SectionWrapperContent style={{ minHeight: 200 }}>
        <SectionTitle>Your Payments</SectionTitle>
        <Table
          dataSource={props.data}
          columns={paymentsColumns}
          rowKey={record => record._id}
        />
      </SectionWrapperContent>
    </section>
  );
}
