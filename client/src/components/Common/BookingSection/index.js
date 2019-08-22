import React from "react";
import { Row, Col, Icon } from "antd";

import Calendar from "../Calendar";
import DisabledPopOver from "../DisabledPopOver";
import { ReactComponent as MapPin } from "../../../assets/mapPin.svg";
import randomProfile from "../../../assets/random-profile.jpg";

import {
  SectionTitle,
  Image,
  HostInfo,
  HostName,
  JopTitle,
  Bio
} from "./InternDashboard.style";

import { SectionWrapperContent, BlueLink } from "../general";

export default function BookingSection(props) {
  const {
    jobTitle,
    bio,
    name,
    userId,
    profileImage,
    organisationName,
    bookingId,
    startDate,
    endDate,
    title,
    role
  } = props;

  return (
    <>
      <section>
        <Row gutter={20}>
          <Col lg={16} md={14} sm={24}>
            <SectionWrapperContent style={{ minHeight: 420 }}>
              <>
                <Row type="flex" justify="space-between" align="middle">
                  <SectionTitle>{title}</SectionTitle>
                  <DisabledPopOver>
                    <BlueLink to="#" style={{ fontWeight: "normal" }}>
                      view on map&nbsp;
                      <Icon component={MapPin} />
                    </BlueLink>
                  </DisabledPopOver>
                </Row>
                <Row type="flex">
                  <Image
                    src={profileImage || randomProfile}
                    onError={e => (e.target.src = randomProfile)}
                    alt="host profile image"
                  />
                  <HostInfo>
                    <HostName>{name}</HostName>
                    <JopTitle>
                      {jobTitle} at the {organisationName}
                    </JopTitle>
                    <Bio>{bio}</Bio>
                  </HostInfo>
                </Row>
                <Row type="flex" gutter={30}>
                  <Col>
                    <BlueLink marginb="1.25rem" to={`/booking/${bookingId}`}>
                      View booking
                    </BlueLink>
                  </Col>
                  <Col>
                    <BlueLink marginb="1.25rem" to={`/${role}/${userId}`}>
                      View profile
                    </BlueLink>
                  </Col>
                  <Col>
                    <DisabledPopOver>
                      <BlueLink marginb="1.25rem" to="#">
                        Message {role}
                      </BlueLink>
                    </DisabledPopOver>
                  </Col>
                </Row>
              </>
            </SectionWrapperContent>
          </Col>
          <Col lg={8} md={10} sm={24}>
            <SectionWrapperContent style={{ minHeight: 422 }}>
              <Calendar startDate={startDate} endDate={endDate} />
            </SectionWrapperContent>
          </Col>
        </Row>
      </section>
    </>
  );
}
