import React from "react";
import { withRouter } from "react-router-dom";
import { Table } from "antd";

import { bookingsColumns } from "./TablesColumns";

import { SectionTitle } from "./InternDashboard.style";
import { SectionWrapperContent } from "../../Common/general";

function BookingsSection(props) {
  const { data, windowWidth, history } = props;

  return (
    <section>
      <SectionWrapperContent id="viewBooking" style={{ minHeight: 200 }}>
        <SectionTitle>Your Bookings</SectionTitle>
        <Table
          dataSource={data}
          columns={bookingsColumns(windowWidth)}
          rowKey={"_id"}
          onRow={record => {
            return {
              onClick: () => history.push(`/booking/${record._id}`),
              style: { cursor: "pointer" }
            };
          }}
        />
      </SectionWrapperContent>
    </section>
  );
}

export default withRouter(BookingsSection);
