import React, { Component } from 'react';
import axios from 'axios';
import {
  Modal,
  message,
  Alert,
  Button,
  Skeleton,
  Row,
  Col,
  InputNumber,
} from 'antd';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { withRouter } from 'react-router-dom';

import {
  CardWrapper,
  PaymentModalTitle,
  InfoMessage,
} from './AddFundsModal.style';
import { Label } from './OrgDashboard.style';

import { API_ORG_PAYMENT_URL } from '../../../constants/apiRoutes';

const initialState = {
  error: '',
  isLoading: false,
  success: false,
  amount: 0,
  availableFunds: 0,
};

class AddFundsModal extends Component {
  state = { ...initialState };

  handleServerResponse = async response => {
    const { amount, availableFunds } = this.state;
    const { account, handleAccountUpdate } = this.props;

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
        const penniesAmount = Math.floor(amount * 100);

        const { data: paymentResult } = await axios.post(API_ORG_PAYMENT_URL, {
          account,
          amount: penniesAmount,
          paymentIntent: result.paymentIntent,
        });
        await this.handleServerResponse(paymentResult);
      }
    } else {
      // payment successful
      const newAccount = { ...account, currentBalance: availableFunds };
      this.setState({ isLoading: false, success: true }, () => {
        setTimeout(
          () =>
            this.setState({ ...initialState }, () =>
              handleAccountUpdate(newAccount),
            ),
          2000,
        );
      });
    }
  };

  handleSubmit = async () => {
    try {
      const { cardElement, amount } = this.state;
      const { stripe, account } = this.props;

      if (!amount) {
        return this.setState({
          error: 'you need to specify the amount you want to add',
        });
      }

      // start payment proccess
      this.setState({ isLoading: true });

      const { error, paymentMethod } = await stripe.createPaymentMethod(
        'card',
        cardElement,
      );

      if (error) {
        this.setState({ error: error.message, isLoading: false });
      } else {
        const penniesAmount = Math.floor(amount * 100);

        const { data: paymentResult } = await axios.post(API_ORG_PAYMENT_URL, {
          paymentMethod,
          amount: penniesAmount,
          account,
        });

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

  handleAmountChange = val => {
    const {
      account: { currentBalance },
    } = this.props;
    const penniesVal = Math.floor(val * 100);

    this.setState({
      amount: val,
      availableFunds: currentBalance + penniesVal,
    });
  };

  handleReady = element => this.setState({ cardElement: element });

  renderPaymentMethod = () => {
    const { error, success, isLoading, amount } = this.state;
    const { account, stripe } = this.props;

    if (!account) {
      return <Alert message="Something went wrong" type="error" />;
    }

    if (!stripe) {
      return <Alert message="stripejs hasn't loaded yet" type="error" />;
    }

    if (success) {
      return (
        <Alert
          style={{ marginTop: '1rem' }}
          type="success"
          message="Your payment proccesed successful"
        />
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
        {error ? <Alert message={error} type="error" /> : ''}
        <Button
          type="primary"
          style={{ margin: '2.5rem auto 0', display: 'block' }}
          onClick={this.handleSubmit}
          disabled={isLoading}
        >
          Pay £{Number(amount).toFixed(2)}&nbsp;now
        </Button>
      </>
    );
  };

  handleCancel = () => {
    const { handlePayNowClick } = this.props;
    this.setState({ ...initialState }, () => handlePayNowClick(false));
  };

  render() {
    const { amount } = this.state;
    return (
      <Modal
        visible={this.props.showAddFunds}
        onCancel={this.handleCancel}
        bodyStyle={{ minHeight: 300 }}
        footer={null}
      >
        <PaymentModalTitle>Add funds</PaymentModalTitle>
        <Row gutter={8} type="flex" align="middle">
          <Col span={6}>
            <Label>Amount:</Label>
          </Col>
          <Col span={8} offset={1}>
            <InputNumber
              value={amount}
              autoFocus
              max={99999999}
              min={0}
              size="large"
              style={{
                width: '140px',
                border: '1px solid #d9d9d9',
              }}
              formatter={value =>
                `£${value
                  .toString()
                  .replace(/[^\d.]/g, '')
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  .replace(/^0/, '')
                  .replace(/^,/, '') || 0}`
              }
              parser={value => value.toString().replace(/[^\d.]/g, '') || 0}
              onChange={this.handleAmountChange}
            />
          </Col>
          <Col span={9}>
            <InfoMessage>
              funds:&nbsp;
              {(
                (this.state.availableFunds ||
                  this.props.account.currentBalance) / 100
              ).toFixed(2)}
            </InfoMessage>
          </Col>
        </Row>
        {this.renderPaymentMethod()}
      </Modal>
    );
  }
}

export default injectStripe(withRouter(AddFundsModal));
