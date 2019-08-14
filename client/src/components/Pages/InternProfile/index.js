import React, { Component } from "react";
import { Row, Col, Avatar, Table } from "antd";

import {
  PageWrapper,
  ContentWrapper,
  BackLinkDiv,
  Arrow,
  BackLink,
  HeaderWrapper,
  HiText,
  Section,
  SectionTitle,
  SectionWrapperContent,
  SubTitle,
  Paragraph,
  Details,
  FileDetails,
  BoldSpan,
  BlueSpan,
  BookingsTableWrapper
} from "./InternProfile.style";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street"
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street"
  }
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  }
];

const name = "Ramy Shurafa";

class InternProfile extends Component {
  render() {
    return (
      <PageWrapper>
        <ContentWrapper>
          <BackLinkDiv>
            <Arrow />
            <BackLink to="/">back to search results</BackLink>
          </BackLinkDiv>
          <HeaderWrapper>
            <Row gutter={20} type="flex" justify="start">
              <Col xs={24} sm={4} lg={3}>
                <Avatar
                  size="large"
                  icon="user"
                  src={undefined}
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
                <HiText>Hi {name}</HiText>
              </Col>
            </Row>
          </HeaderWrapper>

          <Section>
            <SectionTitle>Verify your details</SectionTitle>
            <SectionWrapperContent>
              <Row gutter={50} type="flex" justify="space-between">
                <Col xs={24} lg={12}>
                  <SubTitle>Bio</SubTitle>
                  <Paragraph>
                    I work for a local newspaper, recently established a weekly
                    column on council affairs. Aiming to inform the local
                    community and inspire them to find the truth.
                  </Paragraph>

                  <SubTitle>Job title</SubTitle>
                  <Details>Politics Reporter</Details>

                  <SubTitle>Employer</SubTitle>
                  <Details>The Guardian</Details>

                  <SubTitle>Photo ID</SubTitle>
                  <FileDetails>View file</FileDetails>
                </Col>
                <Col xs={24} lg={12}>
                  <SubTitle>Favourite article</SubTitle>
                  <Paragraph>
                    <BoldSpan>
                      Andrew’s favourite article this week is{" "}
                      <BlueSpan>
                        What Could Blockchain Do for Politics?
                      </BlueSpan>
                      , by N. Woolf.
                    </BoldSpan>
                    “I found Nicky’s article on blockchain in politics to be
                    amazingly written. Not only does he unearth the most
                    pressing issues blockchain could fix, but he also shows why
                    it’s not happening yet. Blockchain is not a term you usually
                    see in politics, but moving away from the buzzword and
                    looking at the actual applications, Nicky manages to tell
                    the story of how it could do a lot of good to Georgians.”
                  </Paragraph>
                </Col>
              </Row>
            </SectionWrapperContent>
          </Section>

          <Section>
            <SectionTitle>Other details</SectionTitle>
            <SectionWrapperContent>
              <Row gutter={50} type="flex">
                <Col xs={24} sm={8}>
                  <SubTitle>Photo ID</SubTitle>
                  <FileDetails>View file</FileDetails>

                  <SubTitle>Offer letter</SubTitle>
                  <FileDetails>View file</FileDetails>
                </Col>
                <Col xs={24} sm={12} xl={8}>
                  <SubTitle>Reference 1</SubTitle>
                  <Row gutter={50} type="flex" justify="space-between">
                    <Col xs={24} sm={12} xl={8}>
                      <Details>The Guardian</Details>
                    </Col>
                    <Col xs={24} sm={12} xl={8}>
                      <Details>The Guardian</Details>
                    </Col>
                  </Row>

                  <SubTitle>Reference 2</SubTitle>
                  <Row gutter={50} type="flex" justify="space-between">
                    <Col xs={24} sm={12} xl={8}>
                      <Details>22222222222</Details>
                    </Col>
                    <Col xs={24} sm={12} xl={8}>
                      <Details>22222222222</Details>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </SectionWrapperContent>
          </Section>

          <Section>
            <SectionTitle>Bookings</SectionTitle>
            <SectionWrapperContent>
              <BookingsTableWrapper>
                <Table dataSource={dataSource} columns={columns} />
              </BookingsTableWrapper>
            </SectionWrapperContent>
          </Section>
        </ContentWrapper>
      </PageWrapper>
    );
  }
}

export default InternProfile;
