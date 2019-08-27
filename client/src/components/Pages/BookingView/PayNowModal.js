import React, { Component } from "react";
import axios from "axios";
import { Modal, Button, message } from "antd";
import { injectStripe, CardElement } from "react-stripe-elements";
import { withRouter } from "react-router-dom";

import {
  CardWrapper,
  PaymentModalTitle,
  ErrorMsg,
  InfoMessage
} from "./PaymentsPlan.style";

import { API_INTERN_PAYMENT_URL } from "../../../constants/apiRoutes";

class PayNowModal extends Component {
  state = {
    error: "",
    isLoading: false,
    success: false
  };

  handleServerResponse = async response => {
    const { paymentInfo, couponInfo, bookingInfo } = this.props;
    if (response.error) {
      this.setState({ error: response.error.message, isLoading: false });
    } else if (response.requires_action) {
      const result = await this.props.stripe.handleCardAction(
        response.payment_intent_client_secret
      );
      if (result.error) {
        this.setState({ error: result.error.message, isLoading: false });
      } else {
        // The card action has been handled, confirm it on the server
        const { data: paymentResult } = await axios.post(
          API_INTERN_PAYMENT_URL,
          {
            sessionId: response.sessionId,
            paymentInfo,
            couponInfo,
            bookingInfo,
            paymentIntent: result.paymentIntent
          }
        );
        this.handleServerResponse(paymentResult);
      }
    } else {
      // payment successful
      this.setState({ isLoading: false, success: true });
    }
  };

  handleSubmit = async () => {
    try {
      const { cardElement } = this.state;
      const { paymentInfo, stripe, couponInfo, bookingInfo } = this.props;

      // start payment proccess
      this.setState({ isLoading: true });

      const { error, paymentMethod } = await stripe.createPaymentMethod(
        "card",
        cardElement
      );

      if (error) {
        this.setState({ error: error.message, isLoading: false });
      } else {
        const { data: paymentResult } = await axios.post(
          API_INTERN_PAYMENT_URL,
          {
            paymentInfo,
            paymentMethod,
            bookingInfo,
            couponInfo
          }
        );

        await this.handleServerResponse(paymentResult);
      }
    } catch (error) {
      message.error("something went wrong", 5);
      this.setState({ error: "something went wrong try again later" });
    }
  };

  handleReady = element => {
    this.setState({ cardElement: element });
  };

  renderPaymentMethod = () => {
    const { error, success } = this.state;
    const { paymentInfo, stripe } = this.props;

    if (!paymentInfo) {
      return <ErrorMsg>Something went wrong</ErrorMsg>;
    }
    let amount;
    if (!Array.isArray(paymentInfo)) {
      amount = paymentInfo.amount;
    } else {
      amount = paymentInfo[0] && paymentInfo[0].amount;
    }

    if (!stripe) {
      return <ErrorMsg>stripejs hasn't loaded yet</ErrorMsg>;
    }

    if (success) {
      return (
        <>
          <InfoMessage>Your payment proccesed successful</InfoMessage>
          <Button
            type="link"
            onClick={() => this.props.history.push("/dashboard")}
          >
            back to dashboard
          </Button>
        </>
      );
    }

    return (
      <>
        <CardWrapper>
          <CardElement
            onChange={() => this.setState({ error: "" })}
            onReady={this.handleReady}
            style={{ base: { fontSize: "17px" } }}
          />
        </CardWrapper>
        {error ? <ErrorMsg>{error}</ErrorMsg> : ""}
        <Button
          type="primary"
          style={{ margin: "2.5rem auto 0", display: "block" }}
          onClick={this.handleSubmit}
        >
          Pay £{amount}&nbsp;now
        </Button>
      </>
    );
  };

  render() {
    const { visible, handlePayNowClick } = this.props;

    return (
      <Modal
        visible={visible}
        onCancel={() => handlePayNowClick(false)}
        bodyStyle={{ minHeight: 300 }}
        footer={null}
      >
        <PaymentModalTitle>Complete payment</PaymentModalTitle>
        {this.renderPaymentMethod()}
      </Modal>
    );
  }
}

export default injectStripe(withRouter(PayNowModal));
