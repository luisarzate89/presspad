import React from "react";
import moment from "moment";

import { Row } from "antd";

import { BookingInfoWrapper, InfoText, InfoValue } from "./PaymentsPlan.style";
import {
  SectionWrapperContent,
  SectionTitle,
  PayButton
} from "../../Common/general";
const BookingInfo = props => {
  const fullPrice = 300;
  const remainPrince = 300;

  return (
    <SectionWrapperContent>
      <BookingInfoWrapper>
        <SectionTitle>Your Booking</SectionTitle>
        <InfoText>You've booked your stay for</InfoText>
        <InfoValue mbottom="2.5rem" align="center">
          {moment().format("DD MMM")}&nbsp;-&nbsp;{moment().format("DD MMM")}
        </InfoValue>
        <InfoText>Full price for period</InfoText>
        <InfoValue mbottom="2.5rem" align="center" light>
          £{fullPrice.toFixed(2)}
        </InfoValue>
        <InfoText>So far you’ve paid</InfoText>
        <InfoValue mbottom="2.5rem" align="center" light>
          £{fullPrice.toFixed(2)}
        </InfoValue>
      </BookingInfoWrapper>
      <InfoText>Your next payment is due</InfoText>
      <Row type="flex" justify="space-around">
        <InfoValue mbottom="2.5rem" align="center">
          £{fullPrice.toFixed(2)}
        </InfoValue>
        <InfoValue mbottom="2.5rem" align="center">
          £{fullPrice.toFixed(2)}
        </InfoValue>
        <PayButton>Pay £{remainPrince.toFixed(2)} now</PayButton>
      </Row>
    </SectionWrapperContent>
  );
};
export default BookingInfo;
