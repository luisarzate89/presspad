import React from 'react';
import moment from 'moment';
import { Table } from 'antd';

import { SectionWrapperContent, SectionTitle } from '../../../Common/general';

export default function PaymentsTable({ installments }) {
  const columns = [
    {
      title: 'Due date',
      dataIndex: 'dueDate',
      sorter: (a, b) => moment(a.dueDate) - moment(b.dueDate),
      sortOrder: 'ascend',
      render: text => <span>{moment(text).format('DD MMM YYYY')}</span>,
    },
    {
      title: 'Amount due',
      dataIndex: 'amount',
      render: text => <span>£{(text / 100).toFixed(2)}</span>,
    },
  ];

  columns[2] = {
    title: 'Status',
    render: (text, record) => (
      <span>{record.transaction ? 'paid' : 'not paid'}</span>
    ),
  };

  return (
    <SectionWrapperContent>
      <SectionTitle>Payments</SectionTitle>
      <Table
        columns={columns}
        dataSource={installments}
        pagination={false}
        rowKey={record => record._id}
      />
    </SectionWrapperContent>
  );
}
