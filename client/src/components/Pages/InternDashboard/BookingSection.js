import React from "react";
import { Row, Col, Avatar, Empty } from "antd";

import { getStringTime } from "../../../helpers";
import randomProfile from "../../../assets/random-profile.jpg";
import BookingSection from "../../Common/BookingSection";
import { SectionTitle } from "./InternDashboard.style";

import {
  SectionWrapperContent,
  HeaderWrapper,
  HiText,
  BoldTitle,
  SectionWrapper,
} from "../../Common/general";

export default function BookingSectionWrapper(props) {
  const {
    data: { profileImage, name, nextBookingWithDetails },
    role,
  } = props;

  const firstBooking = nextBookingWithDetails;

  let jobTitle;
  let bio;
  let hostName;
  let hostId;
  let hostProfileImage;
  let organisationName;
  let bookingId;
  let startDate;
  let timeString;
  let endDate;

  if (firstBooking) {
    const {
      host: { profile },
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
    <SectionWrapper>
      <HeaderWrapper>
        <Row type="flex" justify="start">
          <Col xs={6} sm={4} lg={3}>
            <Avatar
              size="large"
              icon="user"
              src={(profileImage && profileImage.url) || undefined}
              style={{
                width: "80px",
                height: "80px",
                margin: "0 auto 0.5rem auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "42px",
                border: "1px solid rgba(0, 0, 0, 0.15)",
              }}
            />
          </Col>
          <Col xs={18} sm={20}>
            {firstBooking ? (
              <HiText>
                Hi {name.split(" ")[0]}, your host is expecting you
                <BoldTitle>{timeString} </BoldTitle>.
              </HiText>
            ) : (
              <HiText> Hi {name.split(" ")[0]}, .</HiText>
            )}
          </Col>
        </Row>
      </HeaderWrapper>
      {firstBooking ? (
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
          profileImage={
            (hostProfileImage && hostProfileImage.url) || randomProfile
          }
          title={title}
          role={role}
          userRole="host"
        />
      ) : (
        <SectionWrapperContent style={{ minHeight: 200 }}>
          <SectionTitle>Your next host</SectionTitle>
          {/* @todo re-word this message */}
          <Empty description="You don't have upcoming stays" />
        </SectionWrapperContent>
      )}
    </SectionWrapper>
  );
}
