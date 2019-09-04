import React, { Component } from "react";
import { Table, message } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

import { columns, createDataSource } from "./config.PaymentsTable";
import {
  API_FIND_WITHDRAW_REQUESTS_URL,
  API_UPDATE_WITHDRAW_REQUEST_URL
} from "../../../constants/apiRoutes";

class PaymentsTable extends Component {
  // columns are declared on the class field so they can't be accidentially changed with setState.
  state = {
    dataSource: null
  };

  handleConfirm = async (id, type) => {
    try {
      await axios.patch(
        `${API_UPDATE_WITHDRAW_REQUEST_URL.replace(":id", id)}`,
        { type }
      );
      message.success(`The request have been ${type} successfully`);

      // update the table dataSource
      const dataArray = this.state.data.map(request => {
        let newRequest = { ...request };
        if (request._id === id) {
          newRequest = { ...request, status: type };
        }
        return newRequest;
      });

      const dataSourceArray = createDataSource(dataArray);
      this.setState({ dataSource: dataSourceArray, data: dataArray });
    } catch (error) {
      message.error("something went wrong");
    }
  };
  columns = columns(this.handleConfirm);

  async componentDidMount() {
    // receives an array of withdraw requests
    try {
      const result = await axios.get(API_FIND_WITHDRAW_REQUESTS_URL);
      const withdrawRequestList = result.data;
      const dataSourceArray = createDataSource(withdrawRequestList);
      this.setState({ dataSource: dataSourceArray, data: withdrawRequestList });
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
