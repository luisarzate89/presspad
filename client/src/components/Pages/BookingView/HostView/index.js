import React, { Component } from "react";
import { Alert } from "antd";

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

import { SectionWrapperContent } from "../../../Common/general";

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
    const { status, intern } = bookingInfo;

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
        {(status === "canceled" || bookingStatus === "canceled") && (
          <SectionWrapperContent mtop="20px">
            <Alert
              style={{ marginTop: "1.2rem", textAlign: "center" }}
              message="Your booking is canceled"
              type="warning"
            />
          </SectionWrapperContent>
        )}
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
