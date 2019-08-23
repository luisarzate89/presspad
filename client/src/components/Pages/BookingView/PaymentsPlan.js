import React from "react";
import moment from "moment";
import { Row, Col, Tabs, Table, Skeleton } from "antd";

import { createInstallments } from "./helpers";
import CouponCode from "./CouponCode";

import {
  InfoMessage,
  TabPanWrapper,
  InfoText,
  InfoValue
} from "./PaymentsPlan.style";
import {
  SectionWrapperContent,
  SectionTitle,
  PayButton
} from "../../Common/general";

const { TabPane } = Tabs;

const columns = [
  {
    title: "Due date",
    dataIndex: "dueDate",
    sorter: (a, b) => moment(a.dueDate) - moment(b.dueDate),
    sortOrder: "ascend",
    render: text => <span>{moment(text).format("DD MMM YYYY")}</span>
  },
  {
    title: "Amount due",
    dataIndex: "amount",
    render: text => <span>£{text.toFixed(2)}</span>
  }
];

const renderPaymentsInstallment = installments => {
  columns[2] = {
    title: "Status",
    render: (text, record) => {
      return <span>{record.transaction ? "paid" : "not paid"}</span>;
    }
  };
  return (
    <SectionWrapperContent>
      <SectionTitle>Your payments</SectionTitle>
      <Table
        columns={columns}
        dataSource={installments}
        pagination={false}
        rowKey={record => record._id}
      />
    </SectionWrapperContent>
  );
};
const PaymentsPlan = ({ data, handleCouponChange }) => {
  const {
    installments,
    isLoading,
    startDate,
    endDate,
    price: totalPrice,
    couponInfo
  } = data;

  if (isLoading || isLoading === null) {
    return (
      <SectionWrapperContent>
        <Skeleton active />
      </SectionWrapperContent>
    );
  }

  if (installments[0]) {
    return renderPaymentsInstallment(installments);
  }

  // If there is no installments
  const {
    couponCode,
    couponDiscount,
    discountDays,
    discountRate,
    isCouponLoading,
    error
  } = couponInfo;
  const remainPrice = totalPrice - couponDiscount;

  const newInstallments = createInstallments(remainPrice, startDate, endDate);

  return (
    <SectionWrapperContent>
      <SectionTitle>Choose payment plan</SectionTitle>
      <Row gutter={30}>
        <Col sm={15} xs={24}>
          <Row type="flex" align="middle">
            <Col span={12}>
              <InfoText>Total price: </InfoText>
            </Col>

            <Col span={12}>
              <InfoValue light>{totalPrice.toFixed(2)}</InfoValue>
            </Col>
          </Row>
          <Row type="flex" align="middle">
            <Col span={12}>
              <InfoText>Remaining price: </InfoText>
            </Col>
            <Col span={12}>
              <InfoValue light>{remainPrice.toFixed(2)}</InfoValue>
            </Col>
          </Row>
        </Col>
        <Col sm={9} xs={24}>
          <CouponCode
            couponCode={couponCode}
            discountDays={discountDays}
            discountRate={discountRate}
            startDate={startDate}
            endDate={endDate}
            isLoading={isCouponLoading}
            couponDiscount={couponDiscount}
            error={error}
            handleCouponChange={handleCouponChange}
          />
        </Col>
      </Row>
      <Row>
        <Tabs tabBarStyle={{ textAlign: "center" }} defaultActiveKey="2">
          <TabPane tab="Pay up front" key="1">
            <TabPanWrapper>
              <PayButton mtop="2rem">
                Pay £{remainPrice.toFixed(2)} now
              </PayButton>
            </TabPanWrapper>
          </TabPane>
          <TabPane tab="Pay in 3 installments" key="2">
            <TabPanWrapper>
              <Table
                columns={columns}
                dataSource={newInstallments}
                pagination={false}
              />
              <InfoMessage>
                You must pay the first installment to finalize the booking
              </InfoMessage>
              <PayButton>Pay £{newInstallments[0].amount} now</PayButton>
            </TabPanWrapper>
          </TabPane>
        </Tabs>
      </Row>
    </SectionWrapperContent>
  );
};

export default PaymentsPlan;
