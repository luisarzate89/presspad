import React, { Component } from "react";
import { Spin, message } from "antd";

//api
import { API_VERIFY_PROFILE_URL } from "../../../constants/apiRoutes";
import Calendar from "./Calendar";
import axios from "axios";

// common components
import Button from "./../../Common/Button/index";
import ListingGallery from "../../Common/Profile/ListingGallery";

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
  ProfilePic,
  TextContentDiv,
  Address,
  SymbolDiv,
  Symbol,
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
import profilePlaceholder from "../../../assets/random-profile.jpg";

class HostProfile extends Component {
  state = {
    isLoading: true,
    profileData: null,
    reviews: null,
    internBookings: [],
    adminView: this.props.adminView,
    profileId: null
  };

  // functions
  getHostProfile = () => {
    const { id: hostId } = this.props.match.params;
    axios
      .get(`/api/host/${hostId}`)
      .then(({ data }) => {
        this.setState({
          isLoading: false,
          profileData: data
        });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  };

  componentDidMount() {
    // check to see if this is the adminView from dashboard
    const { adminView } = this.state;

    this.getHostProfile();
    if (!adminView) {
      axios
        .get(`/api/bookings/${this.props.id}`)
        .then(result => this.setState({ internBookings: result.data }))
        .catch(err => console.log(err));
    }
  }

  // Fallback placeholder if image didn't load
  handleImageFail = ({ target }) => (target.src = profilePlaceholder);

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
    const {
      profileData: {
        listing: {
          _id,
          availableDates,
          price,
          address,
          photos,
          otherInfo,
          description
        },
        profile: {
          bio,
          jobTitle,
          organisation,
          profileImage,
          _id: profileId,
          verified
        },
        name,
        email,
        reviews
      },
      adminView,
      internBookings
    } = this.state;
    const { hideProfile, match, id: currentUserId } = this.props;
    const { id: hostId } = match.params;

    return (
      <Wrapper>
        <LinkDiv>
          {adminView ? (
            <AdminTopDiv>
              <BackLinkDiv>
                <Arrow />
                <BackToAdmin onClick={hideProfile}>back to hosts</BackToAdmin>
              </BackLinkDiv>
              {verified ? (
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
          <ProfilePic
            src={profileImage || profilePlaceholder}
            adminView={adminView}
            onError={this.handleImageFail}
          />

          <HeaderDiv>
            {adminView ? (
              <Headline>{name}</Headline>
            ) : (
              <Headline>
                A {jobTitle} at {organisation.name}
              </Headline>
            )}

            <Address>{`${address.street}, ${address.city}`}</Address>
          </HeaderDiv>

          <SymbolDiv>
            {/* this is the badge component */}
            {this.state.profileData.profile.badge && <Symbol src={starSign} />}
          </SymbolDiv>
        </Header>

        <ListingGallery
          img1={photos[0] && photos[0].url}
          img2={photos[1] && photos[1].url}
          img3={photos[2] && photos[2].url}
        />
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
                  {otherInfo.map(li => (
                    <ListItem key={li}>{li}</ListItem>
                  ))}
                </List>
              </OtherInfo>
            </Card>
            <Card>
              <PressPadOffer>
                <SubHeadline>My PressPad Offer</SubHeadline>
                <ParagraphHeadline>
                  {address.street}, {address.city}, {address.postcode}
                </ParagraphHeadline>
                <Paragraph>{description}</Paragraph>
              </PressPadOffer>
            </Card>
            {reviews.length > 0 && (
              <Card>
                <Reviews>
                  <SubHeadline>Reviews</SubHeadline>
                  <ReviewsSection>
                    {reviews.map(re => (
                      <ReviewsBox key={re._id}>
                        <ReviewsHeader>
                          <StarRate disabled defaultValue={re.rating} />
                          <ReviewHeadline>
                            {re.from.name.split(" ")[0]},{" "}
                            {re.from.profile.jobTitle}
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
                  currentUserId={currentUserId}
                  hostId={hostId}
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
