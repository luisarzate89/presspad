import React, { Component } from "react";

//api
import {
  API_HOST_PROFILE_URL,
  API_VERIFY_PROFILE_URL
} from "../../../constants/apiRoutes";
import Calendar from "./Calendar";
import axios from "axios";

// common components
import Button from "./../../Common/Button/index";

//styles

import {
  Wrapper,
  LinkDiv,
  BackLinkDiv,
  AdminTopDiv,
  MultipleButtons,
  Arrow,
  BackToAdmin,
  BackLink,
  Header,
  HeaderDiv,
  Headline,
  SubHeadline,
  ParagraphHeadline,
  Paragraph,
  StarRate
} from "../../Common/Profile/Profiles.style";

import {
  MainSection,
  Card,
  ProfilePicDiv,
  TextContentDiv,
  Address,
  SymbolDiv,
  Symbol,
  ImageSection,
  MainImageDiv,
  MainImage,
  SubImage,
  SideImageDiv,
  AboutMe,
  OtherInfo,
  PressPadOffer,
  Reviews,
  AvailableHosting,
  CalendarDiv,
  List,
  ListItem,
  ReviewsBox,
  MoreReviewsLink,
  ReviewsHeader,
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
    reviews: null,
    internBookings: [],
    adminView: false,
    profileId: null
  };

  // functions
  axiosCall = () => {
    //get user id either from id passed in props or if they've typed in the manual url
    const { hostId } = this.props;

    const id = hostId ? hostId : window.location.href.split("/")[4];
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

  // adminAxiosCall = () => {

  // }

  componentWillMount() {
    // check to see if this is the adminView from dashboard
    const { adminView } = this.props;

    this.setState({ adminView });

    this.axiosCall();

    if (!adminView) {
      axios
        .get(`/api/bookings/${this.props.id}`)
        .then(result => this.setState({ internBookings: result.data }))
        .catch(err => console.log(err));
    }
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

  // Admin function - approve/unapprove profile
  verifyProfile = (profileId, bool) => {
    axios
      .post(API_VERIFY_PROFILE_URL, { profileId, verify: bool })
      .then(() => this.axiosCall())
      .catch(err => console.error(err));
  };

  render() {
    if (this.state.isLoading) return <Spin tip="Loading Profile" />;

    const { profileData, reviews, internBookings, adminView } = this.state;
    const { hideProfile } = this.props;

    const { listing, profile, name, email } = profileData;
    const {
      bio,
      jobTitle,
      organisation,
      profileImage,
      _id: profileId
    } = profile;

    const { _id, availableDates, price } = listing;

    const intern = this.props.id;

    return (
      <Wrapper>
        <LinkDiv>
          {adminView ? (
            <AdminTopDiv>
              <BackLinkDiv>
                <Arrow />
                <BackToAdmin onClick={hideProfile}>back to hosts</BackToAdmin>
              </BackLinkDiv>
              {profile && profile.verified ? (
                <Button
                  label="Unapprove profile"
                  type="verification"
                  color="red"
                  onClick={() => this.verifyProfile(profileId, false)}
                />
              ) : (
                <MultipleButtons>
                  <a href={`mailto:${email}`}>
                    <Button
                      label="Request changes"
                      type="verification"
                      color="orange"
                      margin="0 1rem 0 0"
                    />
                  </a>
                  <Button
                    label="Approve profile"
                    type="verification"
                    color="green"
                    onClick={() => this.verifyProfile(profileId, true)}
                  />
                </MultipleButtons>
              )}
            </AdminTopDiv>
          ) : (
            <BackLinkDiv>
              <Arrow />
              <BackLink to="/">back to search results</BackLink>
            </BackLinkDiv>
          )}
        </LinkDiv>
        <Header>
          <ProfilePicDiv
            src={this.getProfilePic(profileImage)}
            adminView={adminView}
          />

          <HeaderDiv>
            {adminView ? (
              <Headline>{name}</Headline>
            ) : (
              <Headline>
                A {jobTitle} at {organisation.name}
              </Headline>
            )}

            <Address>
              {`${listing.address.street}, ${listing.address.city}`}
            </Address>
          </HeaderDiv>

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
                <Calendar
                  internId={intern}
                  listingId={_id}
                  availableDates={availableDates}
                  internBookings={internBookings}
                  price={price}
                  adminView={adminView}
                />
              </CalendarDiv>
            </Card>
          </AvailableHosting>
        </MainSection>
      </Wrapper>
    );
  }
}

export default HostProfile;
