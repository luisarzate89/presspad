import React, { Component } from "react";
import moment from "moment";
import { Row, Col, Tabs, Table, Skeleton } from "antd";
import axios from "axios";

import { createInstallments, getDiscountDays, calculatePrice } from "./helpers";
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

import { API_COUPON_URL } from "../../../constants/apiRoutes";

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
    couponCode: "",
    discountDays: 0,
    discountRate: 0,
    couponDiscount: 0,
    isCouponLoading: null,
    error: ""
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

  handleCouponChange = async e => {
    const code = e.target.value;
    // only send requests if the code is valid
    if (
      !code ||
      typeof code !== "string" ||
      code.length < 7 ||
      code.length > 14
    ) {
      this.setState({ couponCode: code });
    } else {
      this.setState(
        {
          couponCode: code,
          isCouponLoading: true,
          error: false
        },
        async () => {
          try {
            const {
              data: {
                data: [couponInfo]
              }
            } = await axios.get(`${API_COUPON_URL}?code=${code}`);

            const {
              startDate: couponStart,
              endDate: couponEnd,
              discountRate
            } = couponInfo;

            const {
              data: { startDate, endDate }
            } = this.props;

            const { discountDays, discountRange } = getDiscountDays({
              bookingStart: startDate,
              bookingEnd: endDate,
              couponStart,
              couponEnd
            });
            this.setState(prevState => {
              const newState = {
                discountDays,
                discountRate,
                couponDiscount:
                  (calculatePrice(discountRange) * discountRate) / 100,
                isCouponLoading: false,
                error: false
              };
              if (discountDays === 0) {
                newState.error =
                  "the coupon is expired or doesn't cover this booking period";
              }
              return newState;
            });
          } catch (error) {
            let errorMsg = "something went wrong";
            if (error.response && error.response.status === 404) {
              errorMsg = "wrong code ..";
            }
            this.setState({
              isCouponLoading: false,
              error: errorMsg,
              couponDiscount: 0
            });
          }
        }
      );
    }
  };

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
    const {
      couponCode,
      couponDiscount,
      discountDays,
      discountRate,
      isCouponLoading,
      error
    } = this.state;
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
              handleCouponChange={this.handleCouponChange}
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
