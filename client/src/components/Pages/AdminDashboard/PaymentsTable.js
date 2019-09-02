import React, { Component } from "react";
import { Table } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

import { columns, createDataSource } from "./config.PaymentsTable";
import { API_FIND_WITHDRAW_REQUESTS_URL } from "../../../constants/apiRoutes";

class PaymentsTable extends Component {
  // columns are declared on the class field so they can't be accidentially changed with setState.
  columns = columns;
  state = {
    dataSource: null
  };

  async componentDidMount() {
    // receives an array of withdraw requests
    try {
      const result = await axios.get(API_FIND_WITHDRAW_REQUESTS_URL);
      const withdrawRequestList = result.data;
      const dataSourceArray = createDataSource(withdrawRequestList);
      this.setState({ dataSource: dataSourceArray });
    } catch (error) {
      if (error.status === 404) {
        return Swal.fire({
          type: "error",
          title: "Not Found!",
          text: "We couldn't find what you're looking for"
        });
      }
      if (error.status === 500) {
        return Swal.fire({
          type: "error",
          title: "Internal Server Error!",
          text: "Something went wrong! Please try again later."
        });
      }
    }
  }

  render() {
    return <Table dataSource={this.state.dataSource} columns={this.columns} />;
  }
}

export default PaymentsTable;
