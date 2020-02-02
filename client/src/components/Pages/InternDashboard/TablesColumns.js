import React from 'react';
import { Badge } from 'antd';

import moment from 'moment';
import { BlueLink } from './InternDashboard.style';
import { bookingStatus } from '../../../theme';

export const paymentsColumns = [
  {
    title: 'Due date',
    dataIndex: 'dueDate',
    render: (text, record) => (
      <span>{moment(record.dueDate).format('DD MMM YYYY')}</span>
    ),
  },
  {
    title: 'Amount due',
    dataIndex: 'amount',
    render: (text, record) => <span>£{record.amount.toFixed(2)}</span>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (text, record) => {
      if (record.transaction) {
        return <span>Paid</span>;
      }
      return <span>Not Paid</span>;
    },
  },
];

export const bookingsColumns = windowWidth => {
  const columns = [
    {
      title: 'Host',
      dataIndex: 'host.name',
      render: (text, record) => (
        <BlueLink
          style={{ textTransform: 'capitalize' }}
          onClick={e => e.stopPropagation()}
          to={`/hosts/${record.host._id}`}
        >
          {text}
        </BlueLink>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      render: (text, record) => (
        <span>{moment(record.startDate).format('DD MMM YYYY')}</span>
      ),
    },
  ];

  if (windowWidth > 500) {
    columns.push({
      title: 'End Date',
      dataIndex: 'endDate',
      render: endDate => <span>{moment(endDate).format('DD MMM YYYY')}</span>,
    });
  }

  if (windowWidth > 650) {
    columns.push({
      title: 'Total Price',
      dataIndex: 'price',
      render: price => <span>£{price.toFixed(2)}</span>,
    });
  }
  if (windowWidth > 1000) {
    columns.push({
      title: 'Paid so far',
      dataIndex: 'payedAmount',
      render: payedAmount => <span>£{payedAmount.toFixed(2)}</span>,
    });
  }

  columns.push({
    title: 'Status',
    dataIndex: 'status',
    render: (status, record) => (
      <Badge color={bookingStatus[status]} text={status} />
    ),
  });

  if (windowWidth > 800) {
    columns.push({
      title: undefined,
      dataIndex: undefined,
      render: (status, record) => (
        <BlueLink
          style={{ textTransform: 'capitalize' }}
          to={`/booking/${record._id}`}
        >
          view booking
        </BlueLink>
      ),
    });
  }
  return columns;
};
