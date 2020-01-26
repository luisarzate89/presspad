import React from "react";
import { Row, Col, Icon } from "antd";

import Calendar from "../Calendar";
import DisabledPopOver from "../DisabledPopOver";
import { ReactComponent as MapPin } from "../../../assets/mapPin.svg";
import randomProfile from "../../../assets/random-profile.jpg";

import {
  SectionTitle,
  Image,
  HostName,
  JopTitle,
  Bio,
} from "./InternDashboard.style";

import { SectionWrapperContent, BlueLink, InternalLink } from "../general";

export default function BookingSection(props) {
  const {
    jobTitle,
    bio,
    name,
    userId,
    profileImage,
    organisationName,
    role,
    startDate,
    endDate,
    title,
    userRole,
  } = props;

  return (
    <>
      <section>
        <Row gutter={20} type="flex">
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
                <Row gutter={10} type="flex">
                  <Col xs={9} sm={20}>
                    <Image
                      src={profileImage || randomProfile}
                      onError={e => (e.target.src = randomProfile)}
                      alt="host profile image"
                    />
                  </Col>
                  <Col xs={14} sm={24} style={{ paddingLeft: "1rem" }}>
                    <HostName>{name}</HostName>
                    <JopTitle>
                      {jobTitle && `A ${jobTitle}`}
                      {organisationName && ` at the ${organisationName}`}
                    </JopTitle>
                  </Col>
                  <Col xs={24}>
                    <Bio>{bio}</Bio>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between" gutter={30}>
                  {role === "intern" && (
                    <Col>
                      <InternalLink href="#viewBooking">
                        View booking
                      </InternalLink>
                    </Col>
                  )}
                  <Col>
                    <BlueLink marginb="1.25rem" to={`/${userRole}s/${userId}`}>
                      View profile
                    </BlueLink>
                  </Col>
                  <Col>
                    <DisabledPopOver>
                      <BlueLink marginb="1.25rem" to="#">
                        Message {name && name.split(" ")[0]}
                      </BlueLink>
                    </DisabledPopOver>
                  </Col>
                </Row>
              </>
            </SectionWrapperContent>
          </Col>
          <Col lg={8} md={10} sm={24} xs={24}>
            <SectionWrapperContent
              style={{ minHeight: 422, height: "calc(100% - 20px)" }}
            >
              <Calendar startDate={startDate} endDate={endDate} />
            </SectionWrapperContent>
          </Col>
        </Row>
      </section>
    </>
  );
}
