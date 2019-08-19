import React, { Component } from "react";
import { Row, Col } from "antd";

import randomProfile from "../../../assets/random-profile.jpg";
import listingPlaceholder from "../../../assets/listing-placeholder.jpg";
import DisabledPopOver from "../../Common/DisabledPopOver";
import Checklist from "../../Common/Checklist";
import PaymentsPlan from "./PaymentsPlan";

import {
  PageWrapper,
  HeaderWrapper,
  HiText,
  SectionWrapperContent,
  SectionTitle,
  BlueLink
} from "../../Common/general";
import {
  Header,
  ProfilePicDiv,
  HeaderDiv,
  Headline,
  Address,
  SymbolDiv,
  Symbol,
  ImageSection,
  MainImageDiv,
  MainImage,
  SideImageDiv,
  SubImage,
  ParagraphHeadline,
  Paragraph
} from "../../Common/Profile/Profiles.style";

import starSign from "./../../../assets/star-sign-symbol.svg";

export default class BookingView extends Component {
  state = {
    profile: {
      badge: true,
      profileImage: {
        // url: "https://google.ps/batikha.ps"
      },
      jobTitle: "Department Chair",
      organisation: { name: "Chicago kindergarten" },
      bio: "some good stuff about me"
    },
    listing: {
      address: {
        street: "somewhere",
        city: "somecity"
      },
      photos: [
        // { url: "https://google.ps/batikha2.ps" },
        // { url: "https://google.ps/batikha3.ps" },
        // { url: "https://google.ps/batikha4.ps" }
      ]
    },
    checklist: [
      { id: 1, text: "Lorem ipsum sic dolor", isChecked: true },
      { id: 2, text: "Lorem ipsum sic dolor", isChecked: true },
      { id: 3, text: "Lorem ipsum sic dolor", isChecked: true },
      { id: 4, text: "eat your breakfast", isChecked: true },
      { id: 5, text: "Go to sleep", isChecked: false }
    ]
  };
  render() {
    const {
      profile: { profileImage, jobTitle, organisation, badge, bio },
      listing: { address, photos },
      checklist
    } = this.state;

    return (
      <PageWrapper>
        <Header>
          <Row type="flex">
            <ProfilePicDiv
              src={(profileImage && profileImage.url) || randomProfile}
              onError={e => (e.target.src = randomProfile)}
            />

            <HeaderDiv>
              <Headline>
                {(jobTitle || organisation) &&
                  `(A ${jobTitle ? jobTitle : "_"} at ${
                    organisation ? organisation.name : "_"
                  })`}
              </Headline>

              <Address>
                {address &&
                  `${address.street ? address.street + ", " : ""}
                ${address.city ? address.city : ""}`}
              </Address>
            </HeaderDiv>
            <SymbolDiv>
              {/* this is the badge component */}
              {badge && <Symbol src={starSign} />}
            </SymbolDiv>
          </Row>
        </Header>
        <ImageSection>
          <MainImageDiv>
            <MainImage
              src={(photos[0] && photos[0].url) || listingPlaceholder}
            />
          </MainImageDiv>
          <SideImageDiv>
            <SubImage
              src={(photos[1] && photos[1].url) || listingPlaceholder}
            />
            <SubImage
              src={(photos[2] && photos[2].url) || listingPlaceholder}
            />
          </SideImageDiv>
        </ImageSection>
        <Row gutter={24}>
          <Col lg={16} md={14} sm={24}>
            <section>
              <SectionWrapperContent style={{ minHeight: 200 }}>
                <SectionTitle>About me</SectionTitle>
                <ParagraphHeadline>
                  {jobTitle} - {organisation.name}
                </ParagraphHeadline>
                <Paragraph>{bio}</Paragraph>
              </SectionWrapperContent>
              <Row type="flex" style={{ marginBottom: "2rem" }}>
                <DisabledPopOver>
                  <BlueLink to="#">Show other Info</BlueLink>
                </DisabledPopOver>
                <DisabledPopOver>
                  <BlueLink marginl="3rem" to="#">
                    Show pressPad offer
                  </BlueLink>
                </DisabledPopOver>
                <DisabledPopOver>
                  <BlueLink marginl="3rem" to="#">
                    Show Reviews
                  </BlueLink>
                </DisabledPopOver>
              </Row>
            </section>
            <Checklist checklist={checklist} />
            <PaymentsPlan />
          </Col>
          <Col lg={8} md={10} sm={24}>
            <SectionWrapperContent>
              <SectionTitle>Your Booking</SectionTitle>
            </SectionWrapperContent>
          </Col>
        </Row>
      </PageWrapper>
    );
  }
}
