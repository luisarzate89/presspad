import React, { Component } from 'react';

import { Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { colors } from '../../../theme';

export default class ClientTable extends Component {
  state = {
    searchText: '',
  };

  render() {
    const { getColumnSearchProps, data, loading, highlightVal } = this.props;

    const columns = [
      {
        title: 'Organisation',
        dataIndex: 'name',
        key: 'name',
        ...getColumnSearchProps('name'),
        sorter: (a, b) => a.name.localeCompare(b.name),
        className: 'mainCol',
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
        title: 'Total Payments',
        dataIndex: 'totalPayments',
        key: 'totalPayments',
        filters: [
          {
            text: '< 500',
            value: 500,
          },
          {
            text: '500-1000',
            value: 1000,
          },
          {
            text: '> 1000',
            value: 999999999999999999,
          },
        ],
        onFilter: (value, record) => record.totalPayments < value,
        sorter: (a, b) => a.totalPayments - b.totalPayments,
        render: text => (
          <Highlighter
            highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
            searchWords={[highlightVal]}
            autoEscape
            textToHighlight={(text / 100).toFixed(2)}
          />
        ),
      },
      {
        title: 'Current Balance',
        dataIndex: 'currentBalance',
        key: 'currentBalance',
        filters: [
          {
            text: '< 500',
            value: 500,
          },
          {
            text: '500-1000',
            value: 1000,
          },
          {
            text: '> 1000',
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
            textToHighlight={(text / 100).toFixed(2)}
          />
        ),
      },
      {
        title: 'Interns',
        dataIndex: 'numberOfInterns',
        key: 'numberOfInterns',
        sorter: (a, b) => a.numberOfInterns - b.numberOfInterns,
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
        title: 'Currently hosted',
        dataIndex: 'currentlyHosted',
        key: 'currentlyHosted',
        sorter: (a, b) => a.currentlyHosted - b.currentlyHosted,
        render: text => (
          <Highlighter
            highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
            searchWords={[highlightVal]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        scroll={{ x: '100%' }}
        loading={loading}
        rowKey="_id"
      />
    );
  }
}
