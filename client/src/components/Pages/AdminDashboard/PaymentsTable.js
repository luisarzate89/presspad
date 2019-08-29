import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Table, /*Tag*/ } from "antd";

// import { tagColors } from "./../../../theme";

// this isn't even the shape of the object anymore.
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

// temporary: these should come from the state.
const columns = [
  {
    title: 'Host',
    dataIndex: 'host',
    key: 'host',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Due Date',
    dataIndex: 'dueDate',
    key: 'dueDate',
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
  },
  {
    title: 'Account Number',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: 'Sort Code',
    dataIndex: 'sortCode',
    key: 'sortCode',
  },
];

class PaymentsTable extends Component {
/**
 * need to create a table.
 */

  state = {};
  async componentDidMount() {
    /**
     * fetch payment data from the server.
     */
    console.log('component has mounted');
  }

  render() {
    return (
      <Table dataSource={dataSource} columns={columns} />
    );
  }
}

export default PaymentsTable;
