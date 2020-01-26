import React, { Component } from "react";
import { Row, Alert } from "antd";
import moment from "moment";

import InternInfo from "./InternInfo";
import BookingRequestSection from "../BookingRequestSection";
import Checklist from "../Checklist";

// styles
import {
  Wrapper,
  LinkDiv,
  BackLinkDiv,
  Arrow,
  BackLink,
} from "../../../Common/Profile/Profiles.style";

import { SectionWrapperContent, SectionTitle } from "../../../Common/general";

import { InfoWrapper, InfoText, InfoValue } from "./HostView.style";

import "antd/dist/antd.css";

class HostView extends Component {
  state = {
    bookingStatus: "",
  };

  handleBooking = action => {
    this.setState({ bookingStatus: action });
  };

  render() {
    const { bookingStatus } = this.state;
    const { bookingInfo } = this.props;
    const { status, intern, startDate, endDate, price } = bookingInfo;

    return (
      <Wrapper>
        {/* Backlink */}
        <LinkDiv>
          <BackLinkDiv
            role="button"
            onClick={() => this.props.history.goBack()}
          >
            <BackLink>
              <Arrow /> Back
            </BackLink>
          </BackLinkDiv>
        </LinkDiv>
        <InternInfo internId={intern._id} />
        <SectionWrapperContent mtop="20px">
          <SectionTitle>{intern.name.split(" ")[0]}&apos;s stay</SectionTitle>
          <Row type="flex">
            <InfoWrapper>
              <InfoText>Start date</InfoText>
              <InfoValue>{moment(startDate).format("DD.MM.YYYY")}</InfoValue>
            </InfoWrapper>
            <InfoWrapper>
              <InfoText>End date</InfoText>
              <InfoValue>{moment(endDate).format("DD.MM.YYYY")}</InfoValue>
            </InfoWrapper>
            <InfoWrapper>
              <InfoText>Payment</InfoText>
              <InfoValue>£{price.toFixed(2)}</InfoValue>
            </InfoWrapper>
          </Row>
          {(status === "canceled" || bookingStatus === "canceled") && (
            <Alert
              style={{ marginTop: "1.2rem", textAlign: "center" }}
              message="Your booking is canceled"
              type="warning"
            />
          )}
        </SectionWrapperContent>
        {status === "pending" && !bookingStatus && (
          <BookingRequestSection
            bookingInfo={bookingInfo}
            handleBooking={this.handleBooking}
          />
        )}
        {(status === "confirmed" || bookingStatus === "confirmed") && (
          <Checklist bookingInfo={bookingInfo} userRole="host" />
        )}
      </Wrapper>
    );
  }
}

export default HostView;
