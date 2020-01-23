import React from "react";
import { Link } from "react-router-dom";
import { Table, Tag } from "antd";
import Highlighter from "react-highlight-words";

import { colors } from "../../../theme";

// import helpers
import getUserId from "../../../helpers/getUserId";

//  set colours for tags in the table
const tagColors = {
  "Waiting for approval": colors.primary,
  Approved: colors.green,
};

export default function HostTable({
  getColumnSearchProps,
  data,
  loading,
  highlightVal,
  triggerHostView,
}) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.localeCompare(b.name),
      className: "nameCol",
      render: text => (
        <span
          style={{ cursor: "pointer" }}
          onClick={triggerHostView.bind(null, getUserId(data, text), text)}
          role="button"
          tabIndex={0}
        >
          <Highlighter
            highlightStyle={{
              backgroundColor: colors.yellow,
              padding: 0,
            }}
            searchWords={[highlightVal]}
            autoEscape
            textToHighlight={text}
          />
        </span>
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      ...getColumnSearchProps("city"),
      sorter: (a, b) => (a.city || "").localeCompare(b.city || ""),
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
          searchWords={[highlightVal]}
          autoEscape
          textToHighlight={text}
        />
      ),
    },
    {
      title: "Interns Hosted",
      dataIndex: "hosted",
      key: "hosted",
      filters: [
        {
          text: "0",
          value: 1,
        },
        {
          text: "1-10",
          value: 11,
        },
        {
          text: "> 10",
          value: 999999999999999999,
        },
      ],
      onFilter: (value, record) => record.hosted < value,
      sorter: (a, b) => a.hosted - b.hosted,
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
          searchWords={[highlightVal]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
    },
    {
      title: "Current Balance",
      dataIndex: "currentBalance",
      key: "currentBalance",
      filters: [
        {
          text: "< 500",
          value: 500,
        },
        {
          text: "500-1000",
          value: 1000,
        },
        {
          text: "> 1000",
          value: 999999999999999999,
        },
      ],
      onFilter: (value, record) => record.currentBalance < value,
      sorter: (a, b) => a.currentBalance - b.currentBalance,
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
          searchWords={[highlightVal]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
    },
    {
      title: "Total Income",
      dataIndex: "totalIncome",
      key: "totalIncome",
      filters: [
        {
          text: "< 500",
          value: 500,
        },
        {
          text: "500-1000",
          value: 1000,
        },
        {
          text: "> 1000",
          value: 999999999999999999,
        },
      ],
      onFilter: (value, record) => record.totalIncome < value,
      sorter: (a, b) => a.totalIncome - b.totalIncome,
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
          searchWords={[highlightVal]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
    },
    {
      title: "Approval Status",
      dataIndex: "approvalStatus",
      key: "approvalStatus",
      render: status => (
        <Tag color={tagColors[status]} key={status}>
          <Highlighter
            highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
            searchWords={[highlightVal]}
            autoEscape
            textToHighlight={status ? status.toUpperCase() : ""}
          />
        </Tag>
      ),
      filters: [
        {
          text: "Approved",
          value: "Approved",
        },
        {
          text: "Waiting for approval",
          value: "Waiting for approval",
        },
      ],
      onFilter: (value, record) => record.approvalStatus.indexOf(value) === 0,
    },
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
