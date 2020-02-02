import React from 'react';
import moment from 'moment';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';

import { BlueLink } from './HostDashboard.style';
import { getStringTime } from '../../../helpers';
import { colors } from '../../../theme';

const tagColors = {
  pending: colors.green,
  transfered: '#faad14',
  rejected: 'yellow',
  canceled: '#606060',
};

export const withdrawRequestsColumns = windowWidth => {
  const columnsObject = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: amount => <span>£{amount}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={tagColors[status]} key={status}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  if (windowWidth > 1000) {
    columnsObject.push({
      title: 'Bank Name',
      dataIndex: 'bankName',
      key: 'bankName',
    });
  }

  if (windowWidth > 600) {
    columnsObject.push({
      title: 'Requested',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: date => getStringTime(moment(date)),
    });
  }

  if (windowWidth > 800) {
    columnsObject.push({
      title: 'Request Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: date => moment(date).format('DD MMM YYYY'),
    });
  }

  return columnsObject;
};

export const bookingsColumns = windowWidth => {
  const columnsObject = [
    {
      title: 'Itern',
      dataIndex: 'intern.name',
      key: 'intern._id',
      render: (text, record) => (
        <BlueLink>
          <Link
            onClick={e => e.stopPropagation()}
            to={`/interns/${record.intern._id}`}
          >
            {text}
          </Link>
        </BlueLink>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: text => moment(text).format('DD MMM YYYY'),
    },
  ];

  if (windowWidth > 1000) {
    columnsObject.push({
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: text => moment(text).format('DD MMM YYYY'),
    });
    columnsObject.push({
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    });
  }

  if (windowWidth > 800) {
    columnsObject.push({
      title: 'Earnings',
      dataIndex: 'price',
      key: 'price',
      render: text => `£${Number(text).toFixed(2)}`,
    });
  }

  return columnsObject;
};
