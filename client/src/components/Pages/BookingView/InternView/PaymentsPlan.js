import React from "react";
import moment from "moment";
import { Row, Col, Tabs, Table, Skeleton } from "antd";

import CouponCode from "./CouponCode";

import {
  InfoMessage,
  TabPanWrapper,
  InfoText,
  InfoValue,
} from "./PaymentsPlan.style";
import {
  SectionWrapperContent,
  SectionTitle,
  PayButton,
} from "../../../Common/general";

const { TabPane } = Tabs;

const columns = [
  {
    title: "Due date",
    dataIndex: "dueDate",
    sorter: (a, b) => moment(a.dueDate) - moment(b.dueDate),
    sortOrder: "ascend",
    render: text => <span>{moment(text).format("DD MMM YYYY")}</span>,
  },
  {
    title: "Amount due",
    dataIndex: "amount",
    render: text => <span>£{text.toFixed(2)}</span>,
  },
];

const renderPaymentsInstallment = (installments, role) => {
  columns[2] = {
    title: "Status",
    render: (text, record) => (
      <span>{record.transaction ? "paid" : "not paid"}</span>
    ),
  };
  return (
    <SectionWrapperContent>
      <SectionTitle>
        {role === "intern" ? "Your payments" : "Payments"}
      </SectionTitle>
      <Table
        columns={columns}
        dataSource={installments}
        pagination={false}
        rowKey={record => record._id}
      />
    </SectionWrapperContent>
  );
};

const PaymentsPlan = ({
  data,
  handleCouponChange,
  handlePayNowClick,
  handlePaymentMethod,
  role,
}) => {
  const handleTabChange = activeKey => {
    if (activeKey === "1") {
      handlePaymentMethod(true);
    } else {
      handlePaymentMethod(false);
    }
  };
  const {
    installments,
    newInstallments: propsInstallments,
    isLoading,
    startDate,
    endDate,
    price: totalPrice,
    couponInfo,
  } = data;

  if (isLoading || isLoading === null) {
    return (
      <SectionWrapperContent>
        <Skeleton active />
      </SectionWrapperContent>
    );
  }

  if (installments[0]) {
    return renderPaymentsInstallment(installments, role);
  }

  // If there is no installments
  const {
    couponCode,
    couponDiscount,
    discountDays,
    discountRate,
    isCouponLoading,
    error,
  } = couponInfo;
  const remainPrice = totalPrice - couponDiscount;

  return (
    role === "intern" && (
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
          <Tabs
            tabBarStyle={{ textAlign: "center" }}
            defaultActiveKey="1"
            onChange={handleTabChange}
          >
            <TabPane tab="Pay up front" key="1">
              <TabPanWrapper>
                <InfoMessage>
                  {moment().isAfter(endDate)
                    ? `This booking has ended at ${moment(endDate).format(
                        "DD MMM YYYY",
                      )}`
                    : "You must pay to finalize the booking"}
                </InfoMessage>
                <PayButton mtop="2rem" onClick={() => handlePayNowClick(true)}>
                  Pay £{remainPrice.toFixed(2)} now
                </PayButton>
              </TabPanWrapper>
            </TabPane>
            <TabPane tab="Pay in 3 installments" key="2">
              <TabPanWrapper>
                <Table
                  columns={columns}
                  dataSource={propsInstallments[0] ? propsInstallments : []}
                  pagination={false}
                />
                <InfoMessage>
                  {moment().isAfter(endDate)
                    ? `This booking has ended at ${moment(endDate).format(
                        "DD MMM YYYY",
                      )}`
                    : "You must pay the first installment to finalize the booking"}
                </InfoMessage>
                {propsInstallments[0] && (
                  <PayButton onClick={() => handlePayNowClick(true)}>
                    Pay £{propsInstallments[0].amount} now
                  </PayButton>
                )}
              </TabPanWrapper>
            </TabPane>
          </Tabs>
        </Row>
      </SectionWrapperContent>
    )
  );
};

export default PaymentsPlan;
