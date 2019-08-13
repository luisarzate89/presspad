import React from "react";
import { Row, Col, Avatar, Icon } from "antd";

import DisabledPopOver from "../../Common/DisabledPopOver";
import { ReactComponent as MapPin } from "./mapPin.svg";

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
  // should come from props
  const details = "";
  const name = "";
  const jobTitle = "Policy research editor";
  const organisation = "Financial Times";
  const bio =
    "I work at a major news publisher, specialising in politics and international relations. Used to travel a lot but now deal mainly with local policies.";
  const src = "http://themes.saturateui.com/saturate/img/profile-2.jpg";
  const hostName = "Emily Banks";
  const bookingId = "5d518da69e22c80ff36603cd";
  const hostId = "5d518da59e22c80ff366039b";
  return (
    <>
      <HeaderWrapper>
        <Row gutter={20} type="flex" justify="start">
          <Col xs={24} sm={4} lg={3}>
            <Avatar
              size="large"
              icon="user"
              src={(details && details.logo) || undefined}
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
              Hi {name.split(" ")[0]}, Your host is expecting you in&nbsp;
              <b>{5} days</b>.
            </HiText>
          </Col>
        </Row>
      </HeaderWrapper>
      <section>
        <Row gutter={20}>
          <Col lg={16} md={14} sm={24}>
            <SectionWrapperContent style={{ minHeight: 390 }}>
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
                <Image src={src} />
                <HostInfo>
                  <HostName>{hostName}</HostName>
                  <JopTitle>
                    {jobTitle} at the {organisation}
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
            </SectionWrapperContent>
          </Col>
          <Col lg={8} md={10} sm={24}>
            <SectionWrapperContent style={{ minHeight: 390 }}>
              <SectionTitle>Calendar</SectionTitle>
            </SectionWrapperContent>
          </Col>
        </Row>
      </section>
    </>
  );
}
