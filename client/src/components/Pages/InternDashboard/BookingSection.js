import React from "react";
import { Row, Col, Avatar, Icon } from "antd";

import { getStringTime } from "./../../../helpers";
import randomProfile from "../../../assets/random-profile.jpg";
import BookingSection from "./../../Common/BookingSection";

import { HeaderWrapper, HiText } from "../../Common/general";

export default function BookingSectionWrapper(props) {
  const {
    data: { profileImage, name, bookings }
  } = props;

  // Assuming that the intern should only have one active booking,
  // active means either pending or confirmed.
  const firstBooking = bookings[0];

  let jobTitle,
    bio,
    hostName,
    hostId,
    hostProfileImage,
    organisationName,
    bookingId,
    startDate,
    timeString,
    endDate;

  if (firstBooking) {
    const {
      host: { profile }
    } = firstBooking;

    jobTitle = profile.jobTitle;
    bio = profile.bio;
    hostName = firstBooking.host.name;
    hostId = firstBooking.host._id;
    hostProfileImage = profile.profileImage;
    organisationName = profile.organisation.name;
    bookingId = firstBooking._id;
    startDate = firstBooking.startDate;
    endDate = firstBooking.endDate;
    timeString = getStringTime(startDate);
  }
  const title = "Your host";

  return (
    <>
      <HeaderWrapper>
        <Row gutter={20} type="flex" justify="start">
          <Col xs={24} sm={4} lg={3}>
            <Avatar
              size="large"
              icon="user"
              src={profileImage || undefined}
              style={{
                width: "80px",
                height: "80px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "42px",
                border: "1px solid rgba(0, 0, 0, 0.15)"
              }}
            />
          </Col>
          <Col span={20}>
            <HiText>
              Hi {name.split(" ")[0]}, Your host is expecting you&nbsp;
              <b>{timeString}</b>.
            </HiText>
          </Col>
        </Row>
      </HeaderWrapper>
      <BookingSection
        jobTitle={jobTitle}
        bio={bio}
        name={hostName}
        userId={hostId}
        organisationName={organisationName}
        bookingId={bookingId}
        startDate={startDate}
        endDate={endDate}
        timeString={timeString}
        profileImage={hostProfileImage || randomProfile}
        title={title}
        userRole={"intern"}
      />
    </>
  );
}
