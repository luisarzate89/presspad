import React, { Component } from "react";

//api
import { API_HOST_PROFILE_URL } from "../../../constants/apiRoutes";
import Calendar from "./Calendar";
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
  ReviewsSection
} from "./Profile.style";

import "antd/dist/antd.css";

// images

import starSign from "./../../../assets/star-sign-symbol.svg";

import { Spin, message } from "antd";

class HostProfile extends Component {
  state = {
    isLoading: true,
    profileData: null,
    reviews: null
  };

  // functions
  axiosCall = () => {
    //get user id
    const id = window.location.href.split("/")[4];
    const data = { userId: id };
    axios
      .post(API_HOST_PROFILE_URL, data)
      .then(res => {
        this.setState({
          isLoading: false,
          profileData: res.data[0][0],
          reviews: res.data[1]
        });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  };

  componentWillMount() {
    this.axiosCall();
  }

  // checks if profile image exists and returns src path
  getProfilePic = img =>
    img && img.length > 0
      ? img
      : require("./../../../assets/random-profile.jpg");

  // checks if lisitng image exists and goes to right folder
  getListingPic = listingPic => {
    return listingPic && listingPic.length > 0
      ? listingPic
      : require("./../../../assets/listing-placeholder.jpg");
  };

  createAddress = (street, city) => `${street}, ${city}`;

  render() {
    if (this.state.isLoading) return <Spin tip="Loading Profile" />;

    const { profileData, reviews } = this.state;

    const { listing, profile } = profileData;
    const { bio, jobTitle, organisation, profileImage } = profile;

    const { availableDates, price } = listing;

    return (
      <Wrapper>
        <LinkDiv>
          <BackLinkDiv>
            <Arrow />
            <BackLink to="/">back to search results</BackLink>
          </BackLinkDiv>
        </LinkDiv>
        <Header>
          <ProfilePicDiv src={this.getProfilePic(profileImage)} />
          <HeadlineDiv>
            <Headline>
              A {jobTitle} at {organisation.name}
            </Headline>
            <Address>{`${listing.address.street}, ${
              listing.address.city
            }`}</Address>
          </HeadlineDiv>
          <SymbolDiv>
            {/* this needs to be dynamically rendered at some point */}
            <Symbol src={starSign} />
          </SymbolDiv>
        </Header>
        <ImageSection>
          <MainImageDiv>
            <MainImage src={this.getListingPic(listing.photos[0])} />
          </MainImageDiv>
          <SideImageDiv>
            <SubImage src={this.getListingPic(listing.photos[1])} />
            <SubImage src={this.getListingPic(listing.photos[2])} />
          </SideImageDiv>
        </ImageSection>
        <MainSection>
          <TextContentDiv>
            <Card>
              <AboutMe>
                <SubHeadline>About Me</SubHeadline>
                <ParagraphHeadline>
                  {jobTitle} - {organisation.name}
                </ParagraphHeadline>
                <Paragraph>{bio}</Paragraph>
              </AboutMe>
            </Card>
            <Card>
              <OtherInfo>
                <SubHeadline>Other Info</SubHeadline>
                <List>
                  {listing.otherInfo.map((li, i) => (
                    <ListItem key={i}>{li}</ListItem>
                  ))}
                </List>
              </OtherInfo>
            </Card>
            <Card>
              <PressPadOffer>
                <SubHeadline>My PressPad Offer</SubHeadline>
                <ParagraphHeadline>
                  {listing.address.street}, {listing.address.city},{" "}
                  {listing.address.postcode}
                </ParagraphHeadline>
                <Paragraph>{listing.description}</Paragraph>
              </PressPadOffer>
            </Card>
            {reviews.length > 0 && (
              <Card>
                <Reviews>
                  <SubHeadline>Reviews</SubHeadline>
                  <ReviewsSection>
                    {reviews.map((re, i) => (
                      <ReviewsBox key={i}>
                        <ReviewsHeader>
                          <StarRate disabled defaultValue={re.rating} />
                          <ReviewHeadline>
                            {re.from_user.name.split(" ")[0]},{" "}
                            {re.from_profile.jobTitle}
                          </ReviewHeadline>
                        </ReviewsHeader>
                        <ReviewText>{re.message}</ReviewText>
                      </ReviewsBox>
                    ))}
                  </ReviewsSection>
                  <MoreReviewsLink to="/">read more reviews</MoreReviewsLink>
                </Reviews>
              </Card>
            )}
          </TextContentDiv>
          <AvailableHosting>
            <Card>
              <CalendarDiv>
                <SubHeadline>Available hosting</SubHeadline>
                <ParagraphHeadline>
                  Choose a slot to view price and request a stay with this host
                </ParagraphHeadline>
                <Calendar availableDates={availableDates} price={price} />
              </CalendarDiv>
            </Card>
          </AvailableHosting>
        </MainSection>
      </Wrapper>
    );
  }
}

export default HostProfile;
