import React, { Component } from "react";

import { Table, Tag } from "antd";
import { colors } from "./../../../theme";

const tagColors = {
  "Waiting for approval": colors.primary,
  Approved: colors.green
};

// const data = [
//   {
//     key: "1",
//     name: "Simon Dupree",
//     city: "London",
//     hosted: 7,
//     approvalStatus: "Approved"
//   },
//   {
//     key: "2",
//     name: "Reda Haq",
//     city: "Manchester",
//     hosted: 5,
//     approvalStatus: "Waiting for approval"
//   }
// ];

export default class InternTable extends Component {
  state = {
    searchText: ""
  };

  render() {
    const { getColumnSearchProps, data, loading } = this.props;

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        ...getColumnSearchProps("name"),
        sorter: (a, b) => a.name - b.name,
        className: "nameCol"
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city",
        ...getColumnSearchProps("city"),
        sorter: (a, b) => a.city - b.city
      },
      {
        title: "Interns Hosted",
        dataIndex: "hosted",
        key: "hosted",
        filters: [
          {
            text: "0",
            value: 1
          },
          {
            text: "1-10",
            value: 11
          },
          {
            text: "> 10",
            value: 999999999999999999
          }
        ],
        onFilter: (value, record) => record.hosted < value,
        sorter: (a, b) => a.hosted - b.hosted
      },
      {
        title: "Approval Status",
        dataIndex: "approvalStatus",
        key: "approvalStatus",
        sorter: (a, b) => a.status - b.status,
        render: status => (
          <Tag color={tagColors[status]} key={status}>
            {status.toUpperCase()}
          </Tag>
        ),
        filters: [
          {
            text: "Approved",
            value: "Approved"
          },
          {
            text: "Waiting for approval",
            value: "Waiting for approval"
          }
        ],
        onFilter: (value, record) => record.approvalStatus.indexOf(value) === 0
      }
    ];
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "100%" }}
        loading={loading}
      />
    );
  }
}
