import React from "react";
import { Row, Col, Avatar, Icon } from "antd";

import { getStringTime } from "./../../../helpers";
import Calendar from "../../Common/Calendar";
import DisabledPopOver from "../../Common/DisabledPopOver";
import { ReactComponent as MapPin } from "./mapPin.svg";
import randomProfile from "../../../assets/random-profile.jpg";

import {
  SectionTitle,
  Image,
  HostInfo,
  HostName,
  JopTitle,
  Bio
} from "./InternDashboard.style";
import {
  HeaderWrapper,
  HiText,
  SectionWrapperContent,
  BlueLink
} from "../../Common/general";

export default function BookingSection(props) {
  const {
    data: { profileImage, name, bookings }
  } = props;

  // Assuming that the intern should only have one active booking,
  // active means either pending or confirmed.
  // Flatten the booking obj.
  const firstBooking = bookings[0] && {
    ...bookings[0],
    host: {
      ...bookings[0].host[0],
      profile: undefined,
      ...bookings[0].host[0].profile[0]
    }
  };

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
    const { host } = firstBooking;
    jobTitle = host.jobTitle;
    bio = host.bio;
    hostName = host.name;
    hostId = host._id;
    hostProfileImage = host.profileImage;
    organisationName = host.organisation.name;
    bookingId = firstBooking._id;
    startDate = firstBooking.startDate;
    endDate = firstBooking.endDate;
    timeString = getStringTime(startDate);
  }

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
      <section>
        <Row gutter={20}>
          <Col lg={16} md={14} sm={24}>
            <SectionWrapperContent style={{ minHeight: 390 }}>
              {!firstBooking ? (
                <SectionTitle>You have no active bookings</SectionTitle>
              ) : (
                <>
                  <Row type="flex" justify="space-between" align="middle">
                    <SectionTitle>Your Host</SectionTitle>
                    <DisabledPopOver>
                      <BlueLink to="#" style={{ fontWeight: "normal" }}>
                        view on map&nbsp;
                        <Icon component={MapPin} />
                      </BlueLink>
                    </DisabledPopOver>
                  </Row>
                  <Row type="flex">
                    <Image
                      src={hostProfileImage || randomProfile}
                      alt="host profile image"
                    />
                    <HostInfo>
                      <HostName>{hostName}</HostName>
                      <JopTitle>
                        {jobTitle} at the {organisationName}
                      </JopTitle>
                      <Bio>{bio}</Bio>
                    </HostInfo>
                  </Row>
                  <Row type="flex" gutter={30}>
                    <Col>
                      <BlueLink marginb="1.25rem" to={`/bookings/${bookingId}`}>
                        View booking
                      </BlueLink>
                    </Col>
                    <Col>
                      <BlueLink marginb="1.25rem" to={`/hosts/${hostId}`}>
                        View profile
                      </BlueLink>
                    </Col>
                    <Col>
                      <DisabledPopOver>
                        <BlueLink marginb="1.25rem" to="#">
                          Message host
                        </BlueLink>
                      </DisabledPopOver>
                    </Col>
                  </Row>
                </>
              )}
            </SectionWrapperContent>
          </Col>
          <Col lg={8} md={10} sm={24}>
            <SectionWrapperContent style={{ minHeight: 390 }}>
              <Calendar startDate={startDate} endDate={endDate} />
            </SectionWrapperContent>
          </Col>
        </Row>
      </section>
    </>
  );
}
