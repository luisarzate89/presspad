// config file for the antd table "PaymentsTable"
import React from 'react';
import { Icon, Button, Popconfirm, Tooltip } from 'antd';
import Highlighter from 'react-highlight-words';

import { colors } from '../../../theme';

const CheckBoxJsx = ({ paymentStatus }) => {
  switch (paymentStatus) {
    case 'transfered':
      return (
        <Icon type="check-circle" theme="twoTone" twoToneColor={colors.green} />
      );
    case 'canceled':
      return (
        <Icon
          type="close-circle"
          theme="twoTone"
          twoToneColor={colors.orange}
        />
      );
    case 'rejected':
      return <Icon type="stop" theme="twoTone" twoToneColor={colors.red} />;
    default:
      return (
        <Icon
          type="info-circle"
          theme="twoTone"
          twoToneColor={colors.lightBlue}
        />
      );
  }
};

/**
 * @param {Array} array the array of withdraw requests receied in the axios api call.
 * @return {Array} returns array of datasource objects to populate the antd table.
 */
const createDataSource = array =>
  array.map(item => {
    const dataItem = {
      key: item._id,
      host: item.user.name,
      amount: item.amount.toString(),
      paid: <CheckBoxJsx key={item._id} paymentStatus={item.status} />,
      bank: item.bankName,
      account: item.accountNumber,
      sortCode: item.bankSortCode,
    };
    return dataItem;
  });

const columns = (highlightVal, handleClick) => [
  {
    title: 'Host',
    dataIndex: 'host',
    key: 'host',
    className: 'mainCol',
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
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
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
    title: 'Paid',
    dataIndex: 'paid',
    key: 'paid',
  },
  {
    title: 'Bank Name',
    dataIndex: 'bank',
    key: 'bank',
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
    title: 'Account Number',
    dataIndex: 'account',
    key: 'account',
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
    title: 'Sort Code',
    dataIndex: 'sortCode',
    key: 'sortCode',
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
    dataIndex: 'key',
    render: (id, record) => {
      if (record.paid.props.paymentStatus !== 'pending') return null;
      return (
        <>
          <Popconfirm
            title={`Confirm transfer request to ${record.host}`}
            onConfirm={() => handleClick(id, 'transfered')}
          >
            <Tooltip placement="top" title="Transfered">
              <Button type="primary" ghost style={{ marginRight: '0.6rem' }}>
                <Icon type="check" />
              </Button>
            </Tooltip>
          </Popconfirm>
          <Popconfirm
            title={`Cancel transfer request to ${record.host}`}
            onConfirm={() => handleClick(id, 'canceled')}
          >
            <Tooltip placement="top" title="Cancel">
              <Button type="danger" ghost>
                <Icon type="close" />
              </Button>
            </Tooltip>
          </Popconfirm>
        </>
      );
    },
  },
];

export { columns, createDataSource };
