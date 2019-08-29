import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Tag } from "antd";

import { tagColors } from "./../../../theme";

class PaymentsTable extends Component {
/**
 * need to create a table.
 */

  state = {};
  async componentDidMount() {
    console.log('component has mounted');
  }

  render() {
    return (
      <h1>Payments Table</h1>
    );
  }
}

export default PaymentsTable;
