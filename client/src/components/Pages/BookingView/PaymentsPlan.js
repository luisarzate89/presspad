import React from "react";
import moment from "moment";

import {
  InfoMessage,
  TabPanWrapper,
  // PaymentInfoRow,
  InputLabel
} from "./PaymentsPlan.style";
import {
  SectionWrapperContent,
  SectionTitle,
  PayButton
} from "../../Common/general";
import { Row, Col, Tabs, Table, Input } from "antd";
const { TabPane } = Tabs;

const columns = [
  {
    title: "Due date",
    dataIndex: "dueDate",
    render: (text, record) => {
      return <span>{moment(record.dueDate).format("DD MMM YYYY")}</span>;
    }
  },
  {
    title: "Amount due",
    dataIndex: "amount",
    render: (text, record) => {
      return <span>£{record.amount.toFixed(2)}</span>;
    }
  }
];

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

const createInstallments = (netAmount, startDate, endDate) => {
  // split payemnts amount
  const firstPay = Math.round((netAmount / 3) * 100, 2) / 100;
  const secondPay = Math.round(((netAmount - firstPay) / 2) * 100, 2) / 100;
  const thirdPay = netAmount - firstPay - secondPay;

  // split payments dueDate
  //Todo think more about this
  const firstDueDate = moment().isBefore(moment(startDate).subtract(7, "day"))
    ? moment(startDate).subtract(7, "day")
    : moment();
  const secondDueDate = moment(startDate).add(
    Math.round(endDate.diff(startDate, "days") / 2),
    "day"
  );
  const thirdDueDate = endDate;
  // console.log(moment().isBefore(firstDueDate));

  return [
    { key: 1, dueDate: firstDueDate, amount: firstPay },
    { key: 2, dueDate: secondDueDate, amount: secondPay },
    { key: 3, dueDate: thirdDueDate, amount: thirdPay }
  ];
};
export default props => {
  const installments = createInstallments(
    202.13,
    moment(),
    moment().add(10, "day")
  );

  const totalPrice = 302.13;
  const couponDiscount = 100;
  const remainPrince = totalPrice - couponDiscount;

  return (
    <SectionWrapperContent>
      <SectionTitle>Choose payment plan</SectionTitle>
      <Row gutter={30}>
        <Col sm={17} xs={24}>
          <Row>
            <span>Total price: </span>
            <span>{totalPrice.toFixed(2)}</span>
          </Row>
          <Row>
            <span>Remaining price: </span>
            <span>{remainPrince.toFixed(2)}</span>
          </Row>
        </Col>
        <Col sm={7} xs={24}>
          <Row type="flex">
            <Input
              name="couponCode"
              type="text"
              id="couponCode"
              value={"15dk8sd"}
              size="large"
              addonBefore={
                <InputLabel htmlFor="couponCode">Coupon code:</InputLabel>
              }
            />
          </Row>
          <PaymentInfoRow data={{ key: "Days", value: 14 }} />
          <PaymentInfoRow data={{ key: "Discount", value: "50%" }} />
          <PaymentInfoRow
            data={{ key: "Discount amount", value: `£${couponDiscount}` }}
          />
        </Col>
      </Row>
      <Row>
        <Tabs tabBarStyle={{ textAlign: "center" }} defaultActiveKey="2">
          <TabPane tab="Pay up front" key="1">
            <TabPanWrapper>
              <PayButton mtop="2rem">
                Pay £{remainPrince.toFixed(2)} now
              </PayButton>
            </TabPanWrapper>
          </TabPane>
          <TabPane tab="Pay in 3 installments" key="2">
            <TabPanWrapper>
              <Table
                columns={columns}
                dataSource={installments}
                pagination={false}
              />
              <InfoMessage>
                You must pay the first installment to confirm the booking
              </InfoMessage>
              <PayButton>Pay £{installments[0].amount} now</PayButton>
            </TabPanWrapper>
          </TabPane>
        </Tabs>
      </Row>
    </SectionWrapperContent>
  );
};
