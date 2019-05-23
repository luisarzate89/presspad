import React, { Component } from "react";

//api
import { API_HOST_PROFILE_URL } from "../../../constants/apiRoutes";
import axios from "axios";

//styles
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
  ListItem,
  ReviewsBox,
  MoreReviewsLink,
  ReviewsHeader,
  StarRate,
  ReviewHeadline,
  ReviewText,
  ReviewsSection,
  PriceHeadline,
  PriceLabel,
  RequestBtn
} from "./Profile.style";

import "antd/dist/antd.css";

// images
import adamProfile from "./../../../assets/profile-pictures/adam-profile.jpeg";
import starSign from "./../../../assets/star-sign-symbol.svg";
import listingImgC from "./../../../assets/listing-pictures/adam-21-roading-road/house.jpg";
import listingImgB from "./../../../assets/listing-pictures/adam-21-roading-road/kitchen.jpg";
import listingImgA from "./../../../assets/listing-pictures/adam-21-roading-road/living-room.jpg";

import { Spin, message, Calendar } from "antd";

// functions
const axiosCall = () => {
  //get user id
  const id = window.location.href.split("/")[4];
  const url = `${API_HOST_PROFILE_URL}${id}`;
  console.log(url);

  axios
    .get(`${API_HOST_PROFILE_URL}${id}`)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      const error =
        err.response && err.response.data && err.response.data.error;
      message.error(error || "Something went wrong");
    });
};

class HostProfile extends Component {
  state = {
    isLoading: true,
    profileData: null
  };

  componentWillMount() {
    axiosCall();
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) return <Spin tip="Loading Profile" />;

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
            <Card>
              <PressPadOffer>
                <SubHeadline>My PressPad Offer</SubHeadline>
                <ParagraphHeadline>
                  12 Marylbone St., London, NW2 5EP{" "}
                </ParagraphHeadline>
                <Paragraph>
                  I live fairly close to the city centre in a relatively new
                  build and share the apartment with an old friend. She’s a
                  technical engineer and often works on location, so she’s not
                  around very often during spring and summer.
                </Paragraph>
              </PressPadOffer>
            </Card>
            <Card>
              <Reviews>
                <SubHeadline>Reviews</SubHeadline>
                <ReviewsSection>
                  <ReviewsBox>
                    <ReviewsHeader>
                      <StarRate disabled defaultValue={2} />
                      <ReviewHeadline>
                        Alan, political investigator
                      </ReviewHeadline>
                    </ReviewsHeader>
                    <ReviewText>
                      Staying here was an absolute pleasure. I learned a great
                      deal about how to approach politicians and very much
                      enjoyed the city. We managed to go to a few journalistic
                      events as well and met some amazing people!
                    </ReviewText>
                  </ReviewsBox>
                  <ReviewsBox>
                    <ReviewsHeader>
                      <StarRate disabled defaultValue={2} />
                      <ReviewHeadline>
                        Alan, political investigator
                      </ReviewHeadline>
                    </ReviewsHeader>
                    <ReviewText>
                      Staying here was an absolute pleasure. I learned a great
                      deal about how to approach politicians and very much
                      enjoyed the city. We managed to go to a few journalistic
                      events as well and met some amazing people!
                    </ReviewText>
                  </ReviewsBox>
                </ReviewsSection>
                <MoreReviewsLink to="/">read more reviews</MoreReviewsLink>
              </Reviews>
            </Card>
          </TextContentDiv>
          <AvailableHosting>
            <Card>
              <CalendarDiv>
                <SubHeadline>Available hosting</SubHeadline>
                <ParagraphHeadline>
                  Choose a slot to view price and request a stay with this host
                </ParagraphHeadline>
              </CalendarDiv>
              <PricingDiv>
                <PriceHeadline>Full price for period</PriceHeadline>
                <PriceLabel>£245.00</PriceLabel>
                <RequestBtn>Request Stay</RequestBtn>
              </PricingDiv>
            </Card>
          </AvailableHosting>
        </MainSection>
      </Wrapper>
    );
  }
}

export default HostProfile;
