import React, { Component } from "react";

import { Table, Tag } from "antd";
import { colors } from "./../../../theme";

// import helpers
import getUserId from "./../../../helpers/getUserId";

// styling
import { NameLink } from "./AdminDashboard.style.js";

//  set colours for tags in the table
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

  // // user the name of the user to grab their id
  // getUserId = (users, text) => {
  //   const user = users.filter(user => user.name === text);
  //   return user[0].userId;
  // };

  render() {
    const { getColumnSearchProps, data, loading, showProfile } = this.props;

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        ...getColumnSearchProps("name"),
        sorter: (a, b) => a.name.localeCompare(b.name),
        className: "nameCol",
        render: text => (
          <NameLink onClick={() => showProfile(getUserId(data, text))}>
            {text}
          </NameLink>
        )
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city",
        ...getColumnSearchProps("city"),
        sorter: (a, b) => a.city.localeCompare(b.city)
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
        title: "Current Balance",
        dataIndex: "currentBalance",
        key: "currentBalance",
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
        onFilter: (value, record) => record.currentBalance < value,
        sorter: (a, b) => a.currentBalance - b.currentBalance
      },
      {
        title: "Total Income",
        dataIndex: "totalIncome",
        key: "totalIncome",
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
        onFilter: (value, record) => record.totalIncome < value,
        sorter: (a, b) => a.totalIncome - b.totalIncome
      },
      {
        title: "Approval Status",
        dataIndex: "approvalStatus",
        key: "approvalStatus",
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
