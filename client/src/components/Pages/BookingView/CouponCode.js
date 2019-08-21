import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { Row, Col, Input } from "antd";

import { InputLabel } from "./PaymentsPlan.style";

class CouponCode extends Component {
  state = {
    couponCode: "",
    couponDays: 0,
    couponRate: 0,
    isLoading: null
  };
  PaymentInfoRow = ({ data: { key, value } }) => {
    return (
      <Row
        style={{ height: "2.3rem", borderBottom: "1px solid #d9d9d9" }}
        type="flex"
        align="middle"
      >
        <Col offset={1} span={14}>
          {key}:&nbsp;
        </Col>
        <Col span={9} style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: 600 }}>
          {value}
        </Col>
      </Row>
    );
  };

  handleChange = e => {
    const code = e.target.value;
    if (!code || typeof code !== "string" || code.length < 6) {
      this.setState({ couponCode: code });
    } else {
      this.setState({ couponCode: code }, () => {
        // axios.get()
      });
    }
  };

  render() {
    const { PaymentInfoRow } = this;
    const { couponCode, couponDays, couponRate } = this.state;
    const { startDate, endDate, couponDiscount } = this.props;

    const totalDays =
      moment(endDate)
        .startOf("day")
        .diff(moment(startDate).startOf("day"), "day") + 1;
    // console.log(totalDays);
    return (
      <>
        <Row type="flex">
          <Input
            name="couponCode"
            type="text"
            id="couponCode"
            value={couponCode}
            size="large"
            onChange={this.handleChange}
            addonBefore={
              <InputLabel htmlFor="couponCode">Coupon code:</InputLabel>
            }
          />
        </Row>
        <PaymentInfoRow data={{ key: "Coupon Days", value: 14 }} />
        <PaymentInfoRow data={{ key: "Discounted Days", value: totalDays }} />
        <PaymentInfoRow data={{ key: "Discount", value: "50%" }} />
        <PaymentInfoRow
          data={{ key: "Discount amount", value: `£${couponDiscount}` }}
        />
      </>
    );
  }
}

export default CouponCode;
