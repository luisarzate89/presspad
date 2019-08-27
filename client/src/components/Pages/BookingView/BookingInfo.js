import React from "react";
import moment from "moment";

import { Row, Skeleton } from "antd";

import { calculatePrice } from "./helpers";

import {
  BookingInfoWrapper,
  InfoText,
  InfoValue,
  ErrorMsg
} from "./PaymentsPlan.style";

import {
  SectionWrapperContent,
  SectionTitle,
  PayButton
} from "../../Common/general";

const BookingInfo = props => {
  const { isLoading, data, handlePayNowClick } = props;
  const {
    bookingId,
    price: fullPrice,
    payedAmount,
    startDate,
    status,
    endDate,
    installments,
    firstUnpaidInstallment,
    couponDiscount,
    coupons
  } = data;

  let discounts = 0;
  if (!installments[0]) {
    discounts = couponDiscount;
  } else {
    // get all coupons that have been used for this bookings
    coupons.forEach(coupon => {
      coupon.transactions &&
        coupon.transactions.forEach(transaction => {
          if (transaction.booking === bookingId) {
            discounts += calculatePrice(15);
          }
        });
    });
  }

  return (
    <SectionWrapperContent>
      <BookingInfoWrapper>
        <SectionTitle>Your Booking</SectionTitle>
        <Skeleton loading={isLoading} />
        {isLoading === false && (
          <>
            <InfoText>You've booked your stay for</InfoText>
            <InfoValue mbottom="2.5rem" align="center">
              {moment(startDate).format("DD MMM")}&nbsp;-&nbsp;
              {moment(endDate).format("DD MMM")}
            </InfoValue>
            <InfoText>Full price for period</InfoText>
            <InfoValue mbottom="2.5rem" align="center" light>
              £{fullPrice.toFixed(2)}
            </InfoValue>
            {status === "confirmed" ? (
              <>
                <InfoText>Coupon discounts</InfoText>
                <InfoValue mbottom="2.5rem" align="center" light>
                  £{discounts.toFixed(2)}
                </InfoValue>
                <InfoText>So far you’ve paid</InfoText>
                <InfoValue mbottom="2.5rem" align="center" light>
                  £{payedAmount.toFixed(2)}
                </InfoValue>
              </>
            ) : (
              ""
            )}
          </>
        )}
      </BookingInfoWrapper>
      {isLoading === false &&
        installments[0] &&
        status === "confirmed" &&
        firstUnpaidInstallment && (
          <>
            <InfoText>Your next payment is due</InfoText>
            <Row type="flex" justify="space-around">
              <InfoValue mbottom="2.5rem" align="center">
                {moment(firstUnpaidInstallment.dueDate).format("DD MMM")}
              </InfoValue>
              <InfoValue mbottom="2.5rem" align="center">
                £
                {firstUnpaidInstallment.amount &&
                  firstUnpaidInstallment.amount.toFixed(2)}
              </InfoValue>
              <PayButton onClick={() => handlePayNowClick(true)}>
                Pay £{firstUnpaidInstallment.amount.toFixed(2)} now
              </PayButton>
            </Row>
          </>
        )}
      {status !== "confirmed" ? (
        <ErrorMsg>Your booking status is {status}</ErrorMsg>
      ) : (
        ""
      )}
    </SectionWrapperContent>
  );
};
export default BookingInfo;
