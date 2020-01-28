import React from "react";
import moment from "moment";
import { Radio, Modal, message } from "antd";
import axios from "axios";

import {
  BookingDetailsCard,
  BookingDetailsInnerCard,
  BookingDetailsDiv,
  BookingDetailsHeadline,
  BookingDetailsText,
  BookingDetailsContainer,
  RadioContainer,
  ButtonDiv,
  Button,
} from "./bookingRequestSection.style";
import { SubHeadline, Paragraph } from "../../../Common/Profile/Profiles.style";
import { ButtonSpinner } from "../../../Common/Button";

const { confirm } = Modal;

export default class extends React.Component {
  state = {
    apiLoading: false,
    moneyGoTo: "host",
  };

  handleAccept = async () => {
    const { moneyGoTo } = this.state;
    const { bookingInfo, handleBooking } = this.props;

    try {
      this.setState({ apiLoading: true, action: "accept" });

      await axios.patch(`/api/bookings/${bookingInfo._id}/accept`, {
        moneyGoTo,
      });

      this.setState({ apiLoading: false });

      Modal.success({
        title: "Done!",
        content: `You successfully accepted ${
          bookingInfo.intern.name.split(" ")[0]
        }'s request`,
        onOk: () => handleBooking("confirmed"),
        onCancel: () => handleBooking("confirmed"),
      });
    } catch (err) {
      this.setState({ apiLoading: false });

      const error =
        err.response && err.response.data && err.response.data.error;
      message.error(error || "Something went wrong");
    }
  };

  handleReject = () => {
    const { bookingInfo, handleBooking } = this.props;

    confirm({
      title: "Are you sure?",
      content: `Reject ${
        bookingInfo.intern.name.split(" ")[0]
      }'s booking request?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        this.setState({ apiLoading: true, action: "reject" });
        try {
          await axios.patch(`/api/bookings/${bookingInfo._id}/reject`);

          this.setState({ apiLoading: false });

          Modal.success({
            title: "Done!",
            content: `You successfully rejected ${
              bookingInfo.intern.name.split(" ")[0]
            }'s request`,
            onOk: () => handleBooking("canceled"),
            onCancel: () => handleBooking("canceled"),
          });
        } catch (err) {
          this.setState({ apiLoading: false });

          const error =
            err.response && err.response.data && err.response.data.error;
          message.error(error || "Something went wrong");
        }
      },
    });
  };

  onRadioChange = e => {
    this.setState({
      moneyGoTo: e.target.value,
    });
  };

  render() {
    const { apiLoading, moneyGoTo, action } = this.state;

    const {
      bookingInfo: {
        intern: { name },
        startDate,
        endDate,
        price,
      },
    } = this.props;

    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };

    return (
      <BookingDetailsCard>
        <BookingDetailsInnerCard>
          <SubHeadline>{name.split(" ")[0]}’s request to stay</SubHeadline>
          <BookingDetailsContainer>
            <BookingDetailsDiv>
              <BookingDetailsHeadline>Start date</BookingDetailsHeadline>
              <BookingDetailsText>
                {moment(startDate).format("DD.MM.YYYY")}
              </BookingDetailsText>
            </BookingDetailsDiv>
            <BookingDetailsDiv>
              <BookingDetailsHeadline>End date</BookingDetailsHeadline>
              <BookingDetailsText>
                {moment(endDate).format("DD.MM.YYYY")}
              </BookingDetailsText>
            </BookingDetailsDiv>
            <BookingDetailsDiv>
              <BookingDetailsHeadline>Payment</BookingDetailsHeadline>
              <BookingDetailsText>
                £{parseFloat(Math.round(price * 100) / 100).toFixed(2)}{" "}
              </BookingDetailsText>
            </BookingDetailsDiv>
          </BookingDetailsContainer>
          <Paragraph>
            You can choose to receive full payment to your account, or donate
            the money received on this hosting to the PressPad fund. Find out
            more about the fund.
          </Paragraph>
          <RadioContainer>
            <Radio.Group onChange={this.onRadioChange} value={moneyGoTo}>
              <Radio style={radioStyle} value="host">
                Receive payment to my account{" "}
              </Radio>
              <Radio style={radioStyle} value="presspad">
                Donate payment to the PressPad fund{" "}
              </Radio>
            </Radio.Group>
          </RadioContainer>
          <ButtonDiv>
            <Button onClick={this.handleAccept} disabled={apiLoading}>
              {apiLoading && action === "accept" && (
                <ButtonSpinner color="#FFFFFF" />
              )}
              Accept Request
            </Button>
            <Button reject onClick={this.handleReject} disabled={apiLoading}>
              {apiLoading && action === "reject" && (
                <ButtonSpinner color="#E8841F" />
              )}
              Reject Request
            </Button>
          </ButtonDiv>
        </BookingDetailsInnerCard>
      </BookingDetailsCard>
    );
  }
}
