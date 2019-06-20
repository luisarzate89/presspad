import React, { Component } from "react";

import { Table, Tag } from "antd";

import { colors } from "./../../../theme";

const tagColors = {
  pro: colors.primary,
  custom: colors.green,
  basic: colors.gray
};

// const data = [
//   {
//     key: "1",
//     organisation: "Financial Times",
//     totalCredits: 1600,
//     creditsSpent: 1200,
//     interns: 5,
//     currentlyHosted: 4,
//     plan: "pro"
//   },
//   {
//     key: "2",
//     organisation: "The Guardian",
//     totalCredits: 600,
//     creditsSpent: 450,
//     interns: 1,
//     currentlyHosted: 3,
//     plan: "basic"
//   }
// ];

export default class ClientTable extends Component {
  state = {
    searchText: ""
  };

  render() {
    const { getColumnSearchProps, data, loading } = this.props;

    const columns = [
      {
        title: "Organisation",
        dataIndex: "organisation",
        key: "organisation",
        ...getColumnSearchProps("organisation"),
        sorter: (a, b) => a.organisation - b.organisation,
        className: "orgCol"
      },
      {
        title: "Plan",
        dataIndex: "plan",
        key: "plan",
        render: plan => (
          <Tag color={tagColors[plan]} key={plan}>
            {plan.toUpperCase()}
          </Tag>
        ),
        filters: [
          {
            text: "Basic",
            value: "basic"
          },
          {
            text: "Custom",
            value: "custom"
          },
          {
            text: "Pro",
            value: "pro"
          }
        ],
        onFilter: (value, record) => record.plan.indexOf(value) === 0
      },
      {
        title: "Total Credits",
        dataIndex: "totalCredits",
        key: "totalCredits",
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
        onFilter: (value, record) => record.totalCredits < value,
        sorter: (a, b) => a.totalCredits - b.totalCredits
      },
      {
        title: "Credits spent",
        dataIndex: "creditsSpent",
        key: "creditsSpent",
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
        onFilter: (value, record) => record.creditsSpent < value,
        sorter: (a, b) => a.creditsSpent - b.creditsSpent
      },
      {
        title: "Interns",
        dataIndex: "interns",
        key: "interns",
        sorter: (a, b) => a.interns - b.interns
      },
      {
        title: "Currently hosted",
        dataIndex: "currentlyHosted",
        key: "currentlyHosted",
        sorter: (a, b) => a.currentlyHosted - b.currentlyHosted
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
