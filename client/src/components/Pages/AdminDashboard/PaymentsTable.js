import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Table, /*Tag*/ } from "antd";
import axios from "axios";

import { columns, createDataSource } from "./config.PaymentsTable";
// import { tagColors } from "./../../../theme";
import {API_FIND_WITHDRAW_REQUESTS_URL} from "../../../constants/apiRoutes"

// this isn't even the shape of the object anymore.
const dataSource = [
  {
    key: '1',
    host: 'Miske',
    amount: 'Miske',
    dueDate: 'Msike',
    paid: 'Miske',
    bank: 'Miske',
    account: 32,
    sortCode: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

class PaymentsTable extends Component {
  // columns are declared on the class field so they can't be accidentially changed with setState.
  columns = columns;
  state = {
    dataSource,
  };
  async componentDidMount() {
    // receives an array of withdraw requests
    try {
      const result = await axios.get(API_FIND_WITHDRAW_REQUESTS_URL);
      const withdrawRequestList = result.data;
      const dataSourceArray = createDataSource(withdrawRequestList);
      this.setState({ dataSource: dataSourceArray });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Table dataSource={this.state.dataSource} columns={this.columns} />
    );
  }
}

export default PaymentsTable;
