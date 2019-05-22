import React, { Component } from "react";

import {
  Wrapper,
  LinkDiv,
  BackLinkDiv,
  Arrow,
  BackLink,
  Header,
  ProfilePicDiv,
  HeadlineDiv,
  Headline,
  Address,
  SymbolDiv,
  Symbol,
  ImageSection,
  MainImageDiv,
  MainImage,
  SubImage,
  SideImageDiv,
  MainSection,
  TextContentDiv,
  AboutMe,
  OtherInfo,
  PressPadOffer,
  Reviews,
  AvailableHosting,
  CalendarDiv,
  PricingDiv,
  SubHeadline,
  ParagraphHeadline,
  Paragraph,
  Card,
  List,
  ListItem
} from "./Profile.style";

// images
import adamProfile from "./../../../assets/profile-pictures/adam-profile.jpeg";
import starSign from "./../../../assets/star-sign-symbol.svg";
import listingImgC from "./../../../assets/listing-pictures/adam-21-roading-road/house.jpg";
import listingImgB from "./../../../assets/listing-pictures/adam-21-roading-road/kitchen.jpg";
import listingImgA from "./../../../assets/listing-pictures/adam-21-roading-road/living-room.jpg";
import { Calendar } from "antd";

class HostProfile extends Component {
  render() {
    return (
      <Wrapper>
        <LinkDiv>
          <BackLinkDiv>
            <Arrow />
            <BackLink to="/">back to search results</BackLink>
          </BackLinkDiv>
        </LinkDiv>
        <Header>
          <ProfilePicDiv src={adamProfile} />
          <HeadlineDiv>
            <Headline>A policy research editor at Financial Times</Headline>
            <Address>12 Marylbone St., London</Address>
          </HeadlineDiv>
          <SymbolDiv>
            <Symbol src={starSign} />
          </SymbolDiv>
        </Header>
        <ImageSection>
          <MainImageDiv>
            <MainImage src={listingImgA} />
          </MainImageDiv>
          <SideImageDiv>
            <SubImage src={listingImgB} />
            <SubImage src={listingImgC} />
          </SideImageDiv>
        </ImageSection>
        <MainSection>
          <TextContentDiv>
            <Card>
              <AboutMe>
                <SubHeadline>About Me</SubHeadline>
                <ParagraphHeadline>
                  Policy research editor - Financial Times
                </ParagraphHeadline>
                <Paragraph>
                  I work at a major news publisher, specialising in politics and
                  international relations. Used to travel a lot but now deal
                  mainly with local policies.
                </Paragraph>
              </AboutMe>
            </Card>
            <Card>
              <OtherInfo>
                <SubHeadline>Other Info</SubHeadline>
                <List>
                  <ListItem>Pets allowed</ListItem>
                  <ListItem>Pets allowed</ListItem>
                  <ListItem>Pets allowed</ListItem>
                  <ListItem>Pets allowed</ListItem>
                  <ListItem>Pets allowed</ListItem>
                  <ListItem>Pets allowed</ListItem>
                </List>
              </OtherInfo>
            </Card>
            <PressPadOffer />
            <Reviews />
          </TextContentDiv>
          <AvailableHosting>
            <CalendarDiv />
            <PricingDiv />
          </AvailableHosting>
        </MainSection>
      </Wrapper>
    );
  }
}

export default HostProfile;
