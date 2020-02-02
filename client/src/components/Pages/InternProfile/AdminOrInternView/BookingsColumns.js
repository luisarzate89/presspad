import React from 'react';
import moment from 'moment';

export default windowWidth => {
  const columnsObject = [
    {
      title: 'Host',
      dataIndex: 'host.name',
      key: 'host._id',
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
  }

  if (windowWidth > 800) {
    columnsObject.push({
      title: 'Cost',
      dataIndex: 'price',
      key: 'price',
      render: text => `£${Number(text).toFixed(2)}`,
    });
  }

  if (windowWidth > 690) {
    columnsObject.push({
      title: 'Review left',
      key: 'leftReview.rating',
      dataIndex: 'leftReview.rating',
      render: rate => {
        let color = '#0A7AE7';
        if (rate < 3) {
          color = '#E7200A';
        } else if (rate === 3) {
          color = '#faad14';
        }
        return (
          <span style={{ color }}>
            {rate ? `${rate} star${Number(rate) > 1 ? 's' : ''}` : '-'}
          </span>
        );
      },
    });
  }

  if (windowWidth > 400) {
    columnsObject.push({
      title: 'Review received',
      key: 'receivedReview.rating',
      dataIndex: 'leftReview.rating',
      render: rate => {
        let color = '#0A7AE7';
        if (rate < 3) {
          color = '#E7200A';
        } else if (rate === 3) {
          color = '#faad14';
        }
        return (
          <span style={{ color }}>
            {rate ? `${rate} star${Number(rate) > 1 ? 's' : ''}` : '-'}
          </span>
        );
      },
    });
  }

  return columnsObject;
};
