import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Table, Tag } from "antd";

import { tagColors } from "./../../../theme";

// import helpers
import getUserId from "./../../../helpers/getUserId";

// const data = [
//   {
//     key: "1",
//     name: "Andrew Langley",
//     organisation: "Financial Times",
//     totalCredits: 700,
//     creditsSpent: 300,
//     status: "Looking for host"
//   },
//   {
//     key: "2",
//     name: "Claire Bonnay",
//     organisation: "The Guardian",
//     totalCredits: 600,
//     creditsSpent: 450,
//     status: "At host"
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
        sorter: (a, b) => a.name.localeCompare(b.name),
        className: "nameCol",
        render: text => (
          <Link to={`/interns/${getUserId(data, text)}`}>{text}</Link>
        )
      },
      {
        title: "Organisation",
        dataIndex: "organisation",
        key: "organisation",
        ...getColumnSearchProps("organisation"),
        sorter: (a, b) => a.organisation.localeCompare(b.organisation),
        className: "orgCol"
      },
      {
        title: "Total Payments",
        dataIndex: "totalPayments",
        key: "totalPayments",
        filters: [
          {
            text: "< 500",
            value: 500
          },
          {
            text: "500-1000",
            value: 1000
          },
          {
            text: "> 1000",
            value: 999999999999999999
          }
        ],
        onFilter: (value, record) => record.totalPayments < value,
        sorter: (a, b) => a.totalPayments - b.totalPayments
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: status => (
          <Tag color={tagColors[status]} key={status}>
            {status.toUpperCase()}
          </Tag>
        ),
        filters: [
          {
            text: "Looking for host",
            value: "Looking for host"
          },
          {
            text: "At host",
            value: "At host"
          },
          {
            text: "Pending request",
            value: "Pending request"
          }
        ],
        onFilter: (value, record) => record.status.indexOf(value) === 0
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
