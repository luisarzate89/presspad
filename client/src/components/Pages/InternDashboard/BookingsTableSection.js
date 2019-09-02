import React from "react";
import { Table } from "antd";

import { bookingsColumns } from "./TablesColumns";

import { SectionTitle } from "./InternDashboard.style";
import { SectionWrapperContent } from "../../Common/general";

export default function BookingsSection(props) {
  const { data, windowWidth } = props;

  return (
    <section>
      <SectionWrapperContent style={{ minHeight: 200 }}>
        <SectionTitle>Your Bookings</SectionTitle>
        <Table
          dataSource={data}
          columns={bookingsColumns(windowWidth)}
          rowKey={"_id"}
        />
      </SectionWrapperContent>
    </section>
  );
}
