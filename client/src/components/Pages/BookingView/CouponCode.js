import React from "react";

import { Row, Col, Input, Skeleton } from "antd";

import { InputLabel, ErrorMsg } from "./PaymentsPlan.style";

const PaymentInfoRow = ({ data: { key, value } }) => {
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

const CouponCode = props => {
  const {
    couponCode,
    discountDays,
    discountRate,
    isLoading,
    handleCouponChange,
    couponDiscount,
    error
  } = props;

  return (
    <>
      <Input
        name="couponCode"
        type="text"
        id="couponCode"
        value={couponCode}
        size="large"
        onChange={handleCouponChange}
        addonBefore={<InputLabel htmlFor="couponCode">Coupon code:</InputLabel>}
      />
      {error ? <ErrorMsg>{error}</ErrorMsg> : ""}
      {isLoading ? <Skeleton paragraph={{ rows: 0 }} /> : ""}
      {!error && isLoading === false && couponCode && (
        <>
          <PaymentInfoRow
            data={{ key: "Discount Days", value: discountDays }}
          />
          <PaymentInfoRow
            data={{ key: "Discount", value: `${discountRate}%` }}
          />
          <PaymentInfoRow
            data={{ key: "Discount amount", value: `£${couponDiscount}` }}
          />
        </>
      )}
    </>
  );
};

export default CouponCode;
