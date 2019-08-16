import React from "react";
import { Row, Col, Avatar, Table, Empty } from "antd";

import { INTERN_COMPLETE_PROFILE_URL } from "./../../../constants/navRoutes";

import {
  PageWrapper,
  ContentWrapper,
  BackLinkDiv,
  Arrow,
  BlueLink,
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
  BookingsTableWrapper,
  EditButton
} from "./InternProfile.style";
import BookingsColumns from "./BookingsColumns";

const Content = ({
  name,
  bio,
  jobTitle,
  title,
  author,
  description,
  linkWithHttp,
  orgName,
  reference1,
  reference2,
  windowWidth,
  bookingsWithReviews,
  photoID,
  offerLetter,
  profileImage,
  goBack,
  handleViewMoreToggle,
  viewNumber,
  profile,
  role
}) => {
  return (
    <PageWrapper>
      <ContentWrapper>
        {role === "admin" ? (
          <BackLinkDiv>
            <Arrow />
            <BlueLink onClick={goBack}>back to search results</BlueLink>
          </BackLinkDiv>
        ) : (
          <EditButton to={INTERN_COMPLETE_PROFILE_URL}>Edit Profile</EditButton>
        )}

        <HeaderWrapper>
          <Row gutter={20} type="flex" justify="start">
            <Col xs={24} sm={4} lg={3}>
              <Avatar
                size="large"
                icon="user"
                src={profileImage.url || undefined}
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
            <Col span={20} style={{ display: "flex", alignItems: "center" }}>
              <HiText>{name}</HiText>
            </Col>
          </Row>
        </HeaderWrapper>
        <Section>
          <SectionTitle>About Intern</SectionTitle>
          <SectionWrapperContent>
            {Object.keys(profile).length > 0 ? (
              <Row gutter={50} type="flex" justify="space-between">
                <Col xs={24} lg={12}>
                  <SubTitle>Bio</SubTitle>
                  <Paragraph>{bio}</Paragraph>

                  <SubTitle>Job title</SubTitle>
                  <Details>{jobTitle}</Details>

                  <SubTitle>Employer</SubTitle>
                  <Details>{orgName}</Details>

                  <SubTitle>Photo ID</SubTitle>
                  <FileDetails
                    as="a"
                    disabled={!photoID.url}
                    href={photoID.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View file
                  </FileDetails>
                </Col>
                <Col xs={24} lg={12}>
                  <SubTitle>Favourite article</SubTitle>
                  <Paragraph>
                    <BoldSpan>
                      {name.split(" ")[0]}’s favourite article this week is{" "}
                      <BlueSpan
                        as="a"
                        disabled={!linkWithHttp}
                        href={linkWithHttp}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {title}
                      </BlueSpan>
                      , by {author}.
                    </BoldSpan>
                    “{description}”
                  </Paragraph>
                </Col>
              </Row>
            ) : (
              <Empty description="This intern has no profile data" />
            )}
          </SectionWrapperContent>
        </Section>
        <Section>
          <SectionTitle>Other details</SectionTitle>
          <SectionWrapperContent>
            {Object.keys(profile).length > 0 ? (
              <Row gutter={50} type="flex">
                <Col xs={24} sm={8}>
                  <SubTitle>Photo ID</SubTitle>
                  <FileDetails
                    as="a"
                    disabled={!photoID.url}
                    href={photoID.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View file
                  </FileDetails>

                  <SubTitle>Offer letter</SubTitle>
                  <FileDetails
                    as="a"
                    disabled={!offerLetter.url}
                    a={!offerLetter.url}
                    href={offerLetter.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View file
                  </FileDetails>
                </Col>
                <Col xs={24} sm={16}>
                  <SubTitle>Reference 1</SubTitle>
                  <Row gutter={25} type="flex" justify="space-between">
                    <Col xs={24} sm={8}>
                      <Details>{reference1.name}</Details>
                    </Col>
                    <Col xs={24} sm={16}>
                      <Details>{reference1.contact}</Details>
                    </Col>
                  </Row>

                  <SubTitle>Reference 2</SubTitle>
                  <Row gutter={25} type="flex" justify="space-between">
                    <Col xs={24} sm={8}>
                      <Details>{reference2.name}</Details>
                    </Col>
                    <Col xs={24} sm={16}>
                      <Details>{reference2.contact}</Details>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ) : (
              <Empty description="This intern has no profile data" />
            )}
          </SectionWrapperContent>
        </Section>
        <Section>
          <SectionTitle>Bookings</SectionTitle>
          <SectionWrapperContent>
            {Object.keys(profile).length > 0 ? (
              <BookingsTableWrapper>
                <Table
                  columns={BookingsColumns(windowWidth)}
                  dataSource={bookingsWithReviews.slice(0, viewNumber)}
                  rowKey={"_id"}
                  pagination={false}
                />
                {bookingsWithReviews.length > 3 && (
                  <BlueLink
                    onClick={handleViewMoreToggle}
                    style={{ marginTop: "2rem", textAlign: "center" }}
                  >
                    {viewNumber ? "View more" : "View less"}
                  </BlueLink>
                )}
              </BookingsTableWrapper>
            ) : (
              <Empty description="This intern has no bookings yet" />
            )}
          </SectionWrapperContent>
        </Section>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default Content;
