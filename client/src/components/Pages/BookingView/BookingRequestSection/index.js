import React from "react";
import moment from "moment";
import { Radio, Modal, Spin, message } from "antd";
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
  Button
} from "./bookingRequestSection.style";
import { SubHeadline, Paragraph } from "../../../Common/Profile/Profiles.style";
import { ButtonSpinner } from "./../../../Common/Button";
import { API_INTERN_PROFILE_URL } from "./../../../../constants/apiRoutes";

const { confirm } = Modal;

export default class extends React.Component {
  state = {
    isLoading: true,
    moneyGoTo: "host",
    internData: null
  };

  componentWillMount() {
    this.axiosCall();
  }

  axiosCall = () => {
    const { internId } = this.props;
    axios
      .get(
        `${API_INTERN_PROFILE_URL.replace(
          ":id",
          internId
        )}?expand=bookings&expand`
      )
      .then(({ data }) => {
        const { internData, nextBooking } = data;
        this.setState({ internData, nextBooking, isLoading: false });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  };

  handleAccept = () => {
    const {
      nextBooking,
      moneyGoTo,
      internData: { name }
    } = this.state;
    try {
      this.setState({ apiLoading: true, action: "accept" }, async () => {
        await axios.patch(`/api/bookings/${nextBooking._id}/accept`, {
          moneyGoTo
        });

        this.setState({ apiLoading: false });

        Modal.success({
          title: "Done!",
          content: `You successfully accepted ${name.split(" ")[0]}'s request`,
          onOk: () => this.axiosCall()
        });
      });
    } catch (err) {
      this.setState({ apiLoading: false });

      const error =
        err.response && err.response.data && err.response.data.error;
      message.error(error || "Something went wrong");
    }
  };

  handleReject = () => {
    const {
      nextBooking,
      internData: { name }
    } = this.state;
    confirm({
      title: "Are you sure?",
      content: `Reject ${name.split(" ")[0]}'s booking request?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        this.setState({ apiLoading: true, action: "reject" }, async () => {
          try {
            await axios.patch(`/api/bookings/${nextBooking._id}/reject`);

            this.setState({ apiLoading: false });

            Modal.success({
              title: "Done!",
              content: `You successfully rejected ${
                name.split(" ")[0]
              }'s request`,
              onOk: () => this.axiosCall()
            });
          } catch (err) {
            this.setState({ apiLoading: false });

            const error =
              err.response && err.response.data && err.response.data.error;
            message.error(error || "Something went wrong");
          }
        });
      }
    });
  };

  onRadioChange = e => {
    this.setState({
      moneyGoTo: e.target.value
    });
  };

  render() {
    const {
      internData,
      nextBooking,
      apiLoading,
      moneyGoTo,
      action,
      isLoading
    } = this.state;

    let name;
    if (internData) name = internData.name;

    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };

    if (isLoading) return <Spin />;
    return (
      !!nextBooking && (
        <BookingDetailsCard>
          <BookingDetailsInnerCard>
            <SubHeadline>{name.split(" ")[0]}’s request to stay</SubHeadline>
            <BookingDetailsContainer>
              <BookingDetailsDiv>
                <BookingDetailsHeadline>Start date</BookingDetailsHeadline>
                <BookingDetailsText>
                  {moment(nextBooking.startDate).format("DD.MM.YYYY")}
                </BookingDetailsText>
              </BookingDetailsDiv>
              <BookingDetailsDiv>
                <BookingDetailsHeadline>End date</BookingDetailsHeadline>
                <BookingDetailsText>
                  {moment(nextBooking.endDate).format("DD.MM.YYYY")}
                </BookingDetailsText>
              </BookingDetailsDiv>
              <BookingDetailsDiv>
                <BookingDetailsHeadline>Payment</BookingDetailsHeadline>
                <BookingDetailsText>
                  £
                  {parseFloat(
                    Math.round(nextBooking.price * 100) / 100
                  ).toFixed(2)}{" "}
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
                <Radio style={radioStyle} value={"host"}>
                  Receive payment to my account{" "}
                </Radio>
                <Radio style={radioStyle} value={"presspad"}>
                  Donate payment to the PressPad fund{" "}
                </Radio>
              </Radio.Group>
            </RadioContainer>
            <ButtonDiv>
              <Button onClick={this.handleAccept} disabled={apiLoading}>
                {apiLoading && action === "accept" && (
                  <ButtonSpinner color={"#FFFFFF"} />
                )}
                Accept Request
              </Button>
              <Button
                reject={true}
                onClick={this.handleReject}
                disabled={apiLoading}
              >
                {apiLoading && action === "reject" && (
                  <ButtonSpinner color={"#FFFFFF"} />
                )}
                Reject Request
              </Button>
            </ButtonDiv>
          </BookingDetailsInnerCard>
        </BookingDetailsCard>
      )
    );
  }
}
