import React from 'react';
import moment from 'moment';

import { Table, Tag, Icon } from 'antd';
import Highlighter from 'react-highlight-words';

import { tagColors, colors } from '../../../theme';

export default function InternTable({
  getColumnSearchProps,
  data,
  loading,
  highlightVal,
  triggerInternView,
}) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name),
      className: 'nameCol',
      render: (text, { userId }) => (
        <span
          style={{ cursor: 'pointer' }}
          onClick={triggerInternView.bind(null, userId)}
          role="button"
          tabIndex={0}
        >
          <Highlighter
            highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
            searchWords={[highlightVal]}
            autoEscape
            textToHighlight={text}
          />
        </span>
      ),
    },
    {
      title: 'Organisation',
      dataIndex: 'organisation',
      key: 'organisation',
      ...getColumnSearchProps('organisation'),
      sorter: (a, b) =>
        (a.organisation || '').localeCompare(b.organisation || ''),
      className: 'orgCol',
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
      title: 'Next Payment Due Date',
      dataIndex: 'nextInstallmentDueDate',
      key: 'nextInstallmentDueDate',
      sorter: (a, b) =>
        moment(a.nextInstallmentDueDate || 0).valueOf() -
        moment(b.nextInstallmentDueDate || 0).valueOf(),
      className: 'orgCol',
      render: duedate => (
        <Highlighter
          highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
          searchWords={[highlightVal]}
          autoEscape
          textToHighlight={duedate ? moment(duedate).format('DD MMM') : '-'}
        />
      ),
    },
    {
      title: 'Next payment amount',
      dataIndex: 'nextInstallmentAmount',
      key: 'nextInstallmentAmount',
      sorter: (a, b) =>
        a.nextInstallmentAmount || 0 - b.nextInstallmentAmount || 0,
      className: 'orgCol',
      render: (nextInstallmentAmount, record) => {
        if (record.nextInstallmentDueDate) {
          return nextInstallmentAmount ? (
            <>
              {record.nextInstallmentPaid ? (
                <Icon type="check" style={{ color: 'green' }} />
              ) : (
                <Icon type="exclamation" style={{ color: 'yellow' }} />
              )}{' '}
              <Highlighter
                highlightStyle={{
                  backgroundColor: colors.yellow,
                  padding: 0,
                }}
                searchWords={[highlightVal]}
                autoEscape
                textToHighlight={`£${nextInstallmentAmount}`}
              />
            </>
          ) : (
            '-'
          );
        }
        return '-';
      },
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
          textToHighlight={text.toString()}
        />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={tagColors[status]} key={status}>
          <Highlighter
            highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
            searchWords={[highlightVal]}
            autoEscape
            textToHighlight={status.toUpperCase()}
          />
        </Tag>
      ),
      filters: [
        {
          text: 'Looking for host',
          value: 'Looking for host',
        },
        {
          text: 'At host',
          value: 'At host',
        },
        {
          text: 'Pending request',
          value: 'Pending request',
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 5 }}
      scroll={{ x: '100%' }}
      loading={loading}
    />
  );
}
