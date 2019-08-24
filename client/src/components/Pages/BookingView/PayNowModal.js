import React, { Component } from "react";
// import axios from "axios";
import { Modal, Button } from "antd";
import { injectStripe, CardElement } from "react-stripe-elements";
import { CardWrapper, PaymentModalTitle, ErrorMsg } from "./PaymentsPlan.style";

class PayNowModal extends Component {
  state = {
    error: ""
  };

  handleSubmit = async () => {
    // This code is commentd until the backend route is ready
    // const {
    //   data: { clientSecret, intentId }
    // } = await axios.post("/api/v1/intent-payment", {
    //   amount: 1500,
    //   cardType: "card"
    // });
    // const { paymentIntent, error } = await this.props.stripe.handleCardPayment(
    //   clientSecret,
    //   this.state.cardElement
    // );
    // if (error) {
    //   // Handle payment error
    //   this.setState({ error: error.message });
    // } else if (paymentIntent && paymentIntent.status === "succeeded") {
    //   // Handle payment success
    //   console.log(paymentIntent);
    // }
  };

  handleReady = element => {
    this.setState({ cardElement: element });
  };

  render() {
    const { visible, handlePayNowClick, paymentInfo, stripe } = this.props;

    let amount;
    if (!Array.isArray(paymentInfo)) {
      amount = paymentInfo.amount;
    } else {
      amount = paymentInfo[0] && paymentInfo[0].amount;
    }

    return (
      <Modal
        visible={visible}
        onCancel={() => handlePayNowClick(false)}
        bodyStyle={{ minHeight: 300 }}
        footer={null}
      >
        <PaymentModalTitle>Complete payment</PaymentModalTitle>
        {stripe ? (
          <>
            <CardWrapper>
              <CardElement
                onReady={this.handleReady}
                style={{ base: { fontSize: "1.05rem" } }}
              />
            </CardWrapper>
            <Button
              type="primary"
              style={{ margin: "2.5rem auto 0", display: "block" }}
              onClick={this.handleSubmit}
            >
              Pay £{amount}&nbsp;now
            </Button>
          </>
        ) : (
          <ErrorMsg>stripejs hasn't loaded yet</ErrorMsg>
        )}
      </Modal>
    );
  }
}

export default injectStripe(PayNowModal);
