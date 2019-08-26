import React, { Component } from "react";
import { Row, Col, Avatar, Table } from "antd";
import moment from "moment";

import Update from "./Update";
import CouponsColumns from "./CouponsColumns";
import DisabledPopOver from "../../Common/DisabledPopOver";

import {
  PageWrapper,
  ContentWrapper,
  HeaderWrapper,
  HiText,
  Section,
  SectionTitle,
  SectionWrapperContent,
  UpdateList,
  ProfileImage,
  InfoTable,
  InfoTableRow,
  TD,
  TH,
  Card,
  BlueLink,
  InternsTableWrapper
} from "./OrgDashboard.style";

import homeIcon from "./../../../assets/home-icon.svg";
import invoiceIcon from "./../../../assets/invoice-icon.svg";
import contantIcon from "./../../../assets/contact-icon.svg";

class Content extends Component {
  render() {
    const { state, name, windowWidth } = this.props;
    const { details, notifications, account, coupons } = state;

    const currentlyHosted = coupons.filter(item => item.status === "At host")
      .length;

    const liveCoupons = coupons.filter(
      item =>
        moment(item.endDate).valueOf() > Date.now() &&
        moment(item.startDate).valueOf() <= Date.now()
    ).length;
    return (
      <PageWrapper>
        <ContentWrapper>
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
                  Hi {name.split(" ")[0]}, here’s how your interns are doing
                </HiText>
              </Col>
            </Row>
          </HeaderWrapper>

          {/* First row */}
          <Row gutter={20} type="flex" justify="start">
            {/* Your updates col */}
            <Col
              sm={24}
              lg={16}
              style={{
                height: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <Section style={{ marginBottom: "20px" }}>
                <SectionWrapperContent style={{ minHeight: "200px" }}>
                  <SectionTitle>Your updates</SectionTitle>
                  <UpdateList>
                    {notifications.map(item => (
                      <Update item={item} />
                    ))}
                  </UpdateList>
                </SectionWrapperContent>
              </Section>

              <Section>
                <Row gutter={20} type="flex" justify="start">
                  <Col xs={24} sm={8} style={{ height: "auto" }}>
                    <SectionWrapperContent>
                      <Card>
                        <img src={invoiceIcon} alt="Invoices" />
                        <DisabledPopOver>
                          <BlueLink>Invoices</BlueLink>
                        </DisabledPopOver>
                      </Card>
                    </SectionWrapperContent>
                  </Col>
                  <Col xs={24} sm={8} style={{ height: "auto" }}>
                    <SectionWrapperContent>
                      <Card>
                        <img src={homeIcon} alt="View Hosts" />
                        <DisabledPopOver>
                          <BlueLink>View Hosts</BlueLink>
                        </DisabledPopOver>
                      </Card>
                    </SectionWrapperContent>
                  </Col>
                  <Col xs={24} sm={8} style={{ height: "auto" }}>
                    <SectionWrapperContent>
                      <Card>
                        <img src={contantIcon} alt="Contact PressPad" />
                        <DisabledPopOver>
                          <BlueLink>Contact PressPad</BlueLink>
                        </DisabledPopOver>
                      </Card>
                    </SectionWrapperContent>
                  </Col>
                </Row>
              </Section>
            </Col>
            <Col sm={24} lg={8}>
              <Section>
                <SectionWrapperContent
                  style={{ padding: "5px", height: "393px" }}
                >
                  <ProfileImage src={details && details.logo} />

                  <InfoTable>
                    <tbody>
                      <InfoTableRow header className="header">
                        <TH position="left">Available funds:</TH>
                        <TH position="center">
                          {(account && account.currentBalance) || 0}
                        </TH>
                        <TH position="right">
                          <DisabledPopOver>Add funds</DisabledPopOver>
                        </TH>
                      </InfoTableRow>
                      <InfoTableRow>
                        <TD position="left">Live Discount codes:</TD>
                        <TD position="center">{liveCoupons || 0}</TD>
                        <TD position="right">
                          <DisabledPopOver>Add codes</DisabledPopOver>
                        </TD>
                      </InfoTableRow>

                      <InfoTableRow>
                        <TD position="left">Your Active Codes values:</TD>
                        <TD position="center">
                          {(account && account.couponsValue) || 0}
                        </TD>
                      </InfoTableRow>

                      <InfoTableRow>
                        <TD position="left">Currently hosted:</TD>
                        <TD position="center">{currentlyHosted}</TD>
                        <TD position="right" />
                      </InfoTableRow>
                    </tbody>
                  </InfoTable>
                </SectionWrapperContent>
              </Section>
            </Col>
          </Row>

          <Row
            gutter={20}
            type="flex"
            justify="start"
            style={{ marginTop: "20px" }}
          >
            <Col sm={24}>
              <Section style={{ marginBottom: "20px" }}>
                <SectionWrapperContent style={{ padding: 0 }}>
                  <InternsTableWrapper>
                    <Table
                      columns={CouponsColumns(windowWidth)}
                      dataSource={coupons}
                    />
                  </InternsTableWrapper>
                </SectionWrapperContent>
              </Section>
            </Col>
          </Row>
        </ContentWrapper>
      </PageWrapper>
    );
  }
}

export default Content;
