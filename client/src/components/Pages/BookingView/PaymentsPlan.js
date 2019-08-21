import React, { Component } from "react";
import moment from "moment";
import { Row, Col, Tabs, Table, Skeleton } from "antd";

import { createInstallments } from "./helpers";
import CouponCode from "./CouponCode";

import { InfoMessage, TabPanWrapper } from "./PaymentsPlan.style";
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
    render: text => <span>{moment(text).format("DD MMM YYYY")}</span>
  },
  {
    title: "Amount due",
    dataIndex: "amount",
    render: text => <span>£{text.toFixed(2)}</span>
  }
];

class PaymentsPlan extends Component {
  state = {
    couponDiscount: 0
  };

  renderPaymentsInstallment = () => {
    const {
      data: { installments }
    } = this.props;

    columns.push({
      title: "Status",
      render: (text, record) => {
        return <span>{record.transaction ? "paid" : "not paid"}</span>;
      }
    });
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

  handleCouponChange = val => this.setState({ couponDiscount: val });

  render() {
    const {
      installments,
      isLoading,
      startDate,
      endDate,
      price: totalPrice
    } = this.props.data;

    if (isLoading || isLoading === null) {
      return (
        <SectionWrapperContent>
          <Skeleton active />
        </SectionWrapperContent>
      );
    }

    if (installments[0]) {
      return this.renderPaymentsInstallment();
    }

    // If there is no installments
    const { couponDiscount } = this.state;
    const remainPrice = totalPrice - couponDiscount;

    const newInstallments = createInstallments(remainPrice, startDate, endDate);

    return (
      <SectionWrapperContent>
        <SectionTitle>Choose payment plan</SectionTitle>
        <Row gutter={30}>
          <Col sm={15} xs={24}>
            <Row>
              <span>Total price: </span>
              <span>{totalPrice.toFixed(2)}</span>
            </Row>
            <Row>
              <span>Remaining price: </span>
              <span>{remainPrice.toFixed(2)}</span>
            </Row>
          </Col>
          <Col sm={9} xs={24}>
            <CouponCode
              startDate={startDate}
              endDate={endDate}
              couponDiscount={couponDiscount}
              handleChange={this.handleCouponChange}
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
  }
}

export default PaymentsPlan;
