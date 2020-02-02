import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button, message, Skeleton, Alert } from 'antd';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { withRouter } from 'react-router-dom';

import {
  CardWrapper,
  PaymentModalTitle,
  InfoMessage,
} from './PaymentsPlan.style';

import { API_INTERN_PAYMENT_URL } from '../../../../constants/apiRoutes';

class PayNowModal extends Component {
  state = {
    error: '',
    isLoading: false,
    success: false,
  };

  handleServerResponse = async response => {
    const { paymentInfo, couponInfo, bookingId } = this.props;
    if (response.error) {
      this.setState({ error: response.error.message, isLoading: false });
    } else if (response.requires_action) {
      const result = await this.props.stripe.handleCardAction(
        response.payment_intent_client_secret,
      );
      if (result.error) {
        this.setState({ error: result.error.message, isLoading: false });
      } else {
        // The card action has been handled, confirm it on the server
        const { data: paymentResult } = await axios.post(
          API_INTERN_PAYMENT_URL,
          {
            paymentInfo,
            couponInfo,
            bookingId,
            paymentIntent: result.paymentIntent,
          },
        );
        await this.handleServerResponse(paymentResult);
      }
    } else {
      // payment successful
      this.setState({ isLoading: false, success: true });
    }
  };

  handleSubmit = async () => {
    try {
      const { cardElement } = this.state;
      const { paymentInfo, stripe, couponInfo, bookingId } = this.props;

      // start payment proccess
      this.setState({ isLoading: true });

      const { error, paymentMethod } = await stripe.createPaymentMethod(
        'card',
        cardElement,
      );

      if (error) {
        this.setState({ error: error.message, isLoading: false });
      } else {
        const { data: paymentResult } = await axios.post(
          API_INTERN_PAYMENT_URL,
          {
            paymentInfo,
            paymentMethod,
            bookingId,
            couponInfo,
          },
        );

        await this.handleServerResponse(paymentResult);
      }
    } catch (error) {
      if (error.response && error.response.status === 402) {
        return this.setState({
          error: error.response.data.error,
          isLoading: false,
        });
      }
      message.error('something went wrong', 5);
      this.setState({
        error: 'something went wrong try again later',
        isLoading: false,
      });
    }
  };

  handleReady = element => {
    this.setState({ cardElement: element });
  };

  renderPaymentMethod = () => {
    const { error, success, isLoading } = this.state;
    const { paymentInfo, stripe } = this.props;

    if (!paymentInfo) {
      return <Alert type="error" message="Something went wrong" />;
    }
    let amount;
    if (!Array.isArray(paymentInfo)) {
      amount = paymentInfo.amount;
    } else {
      amount = paymentInfo[0] && paymentInfo[0].amount;
    }

    if (!stripe) {
      return <Alert type="error" message="stripejs hasn't loaded yet" />;
    }

    if (success) {
      return (
        <>
          <InfoMessage>Your payment proccesed successful</InfoMessage>
          <Button
            type="link"
            onClick={() => this.props.history.push('/dashboard')}
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
            onChange={() => this.setState({ error: '' })}
            onReady={this.handleReady}
            style={{ base: { fontSize: '17px' } }}
          />
          <Skeleton
            loading={isLoading}
            title={false}
            active
            paragraph={{ rows: 1, width: '95%' }}
          />
        </CardWrapper>
        {error ? <Alert type="error" message={error} /> : ''}
        <Button
          type="primary"
          style={{ margin: '2.5rem auto 0', display: 'block' }}
          onClick={this.handleSubmit}
          disabled={isLoading}
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
