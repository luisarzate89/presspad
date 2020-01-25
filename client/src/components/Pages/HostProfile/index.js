import React, { Component } from "react";
import { Spin, message } from "antd";

// api
import axios from "axios";
import {
  API_VERIFY_PROFILE_URL,
  API_GET_USER_BOOKINGS_URL,
} from "../../../constants/apiRoutes";

import { HOST_COMPLETE_PROFILE_URL } from "../../../constants/navRoutes";

import Calendar from "./Calendar";

// common components
import Button from "../../Common/Button";
import ListingGallery from "../../Common/Profile/ListingGallery";

// styles

import {
  Wrapper,
  LinkDiv,
  BackLinkDiv,
  TopDiv,
  AdminTopDiv,
  MultipleButtons,
  Arrow,
  BackLink,
  Header,
  HeaderDiv,
  Headline,
  SubHeadline,
  ParagraphHeadline,
  Paragraph,
  // StarRate
} from "../../Common/Profile/Profiles.style";

import {
  MainSection,
  Card,
  ProfilePic,
  TextContentDiv,
  Address,
  Symbol,
  InfoCard,
  AvailableHosting,
  CalendarDiv,
  List,
  ListItem,
  EditButton,
  Strong,
  // Reviews,
  // ReviewsBox,
  // MoreReviewsLink,
  // ReviewsHeader,
  // ReviewHeadline,
  // ReviewText,
  // ReviewsSection,
} from "./Profile.style";
import { titleCase } from "../../../helpers";
import "antd/dist/antd.css";

// images
import starSign from "../../../assets/star-sign-symbol.svg";
import profilePlaceholder from "../../../assets/random-profile.jpg";

class HostProfile extends Component {
  state = {
    isLoading: true,
    profileData: null,
    reviews: null,
    internBookings: [],
    availableDates: [],
    profileId: null,
    adminApprovedProfile: false,
  };

  // functions
  // functions
  componentDidMount() {
    const { role } = this.props;

    this.getHostProfile();

    if (role !== "admin") {
      this.getBookings();
    }
  }

  // gets user profile, listings and reviews
  getHostProfile = () => {
    const { match, history, role } = this.props;
    let hostId = match.params.id;
    if (!hostId && match.path === "/my-profile") {
      hostId = this.props.id;
    }

    axios
      .get(`/api/host/${hostId}`)
      .then(({ data }) => {
        if (data.profile) {
          this.setState({
            profileData: data,
            adminApprovedProfile: data.profile.verified,
            isLoading: false,
          });
        }
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        if (
          error === "User has no profile" &&
          ["host", "superhost"].includes(role)
        ) {
          message
            .info(
              <p>
                You don't have profile
                <br /> You will be redirected to complete your profile
              </p>,
              1,
            )
            .then(() => history.push(HOST_COMPLETE_PROFILE_URL));
        } else {
          message.error(error || "Something went wrong");
        }
      });
  };

  // gets user's bookings
  getBookings = () => {
    const { id } = this.props;
    axios
      .get(API_GET_USER_BOOKINGS_URL.replace(":id", id))
      .then(({ data }) => {
        this.setState({ internBookings: data });
      })
      .catch(err => console.log(err));
  };

  // Fallback placeholder if image didn't load
  handleImageFail = ({ target }) => (target.src = profilePlaceholder);

  // Admin function - approve/unapprove profile
  verifyProfile = (profileId, bool) => {
    axios
      .post(API_VERIFY_PROFILE_URL, { profileId, verify: bool })
      .then(() => this.setState({ adminApprovedProfile: bool }))
      .catch(err => console.error(err));
  };

  render() {
    if (this.state.isLoading) return <Spin tip="Loading Profile" />;
    const {
      profileData: {
        _id: userId,
        listing: {
          _id,
          availableDates,
          price,
          address,
          photos,
          otherInfo,
          description,
          accommodationChecklist,
        },
        profile: {
          bio,
          jobTitle,
          organisation,
          profileImage,
          hostingReasonAnswer,
          mentoringExperienceAnswer,
          industryExperienceAnswer,
          backgroundAnswer,
          badge,
          hometown,
          gender,
          school,
        },
        name,
        email,
      },
      internBookings,
      adminApprovedProfile,
    } = this.state;
    const { match, id: currentUserId, role, windowWidth } = this.props;
    const { id: hostId } = match.params;

    return (
      <Wrapper>
        <LinkDiv>
          {role === "admin" ? (
            <AdminTopDiv>
              <BackLinkDiv
                role="button"
                onClick={() => this.props.history.goBack()}
              >
                <Arrow />
                <BackLink>Back to hosts</BackLink>
              </BackLinkDiv>
              {adminApprovedProfile ? (
                <Button
                  label="Unapprove profile"
                  type="verification"
                  color="red"
                  onClick={() => this.verifyProfile(userId, false)}
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
                    onClick={() => this.verifyProfile(userId, true)}
                  />
                </MultipleButtons>
              )}
            </AdminTopDiv>
          ) : (
            <BackLinkDiv
              role="button"
              onClick={() => this.props.history.goBack()}
            >
              <Arrow />
              <BackLink>Back to Search Results</BackLink>
            </BackLinkDiv>
          )}
        </LinkDiv>
        <Header>
          <TopDiv>
            <ProfilePic
              src={profileImage.url || profilePlaceholder}
              adminView={role === "admin" || userId === currentUserId}
              onError={this.handleImageFail}
            />
            <HeaderDiv>
              {role === "admin" ? (
                <Headline>{name}</Headline>
              ) : (
                <Headline>
                  {jobTitle &&
                    `A ${titleCase(jobTitle)} ${
                      organisation ? `at ${titleCase(organisation)}` : ""
                    }`}
                </Headline>
              )}
              <Address>{`${address.street}, ${address.city}`}</Address>
            </HeaderDiv>
          </TopDiv>
          <TopDiv>
            {badge && <Symbol src={starSign} />}

            {userId === currentUserId && (
              <EditButton to={HOST_COMPLETE_PROFILE_URL}>
                Edit Profile
              </EditButton>
            )}
          </TopDiv>
        </Header>

        <ListingGallery
          img1={photos[0] && photos[0].url}
          img2={photos[1] && photos[1].url}
          img3={photos[2] && photos[2].url}
          windowWidth={windowWidth}
        />
        <MainSection>
          <TextContentDiv>
            <Card>
              <InfoCard>
                <SubHeadline>About Me</SubHeadline>
                <ParagraphHeadline>
                  {titleCase(jobTitle)} - {titleCase(organisation)}
                </ParagraphHeadline>
                <Paragraph>{bio}</Paragraph>
                <Paragraph style={{ display: "flex", flexDirection: "column" }}>
                  {hometown && (
                    <span>
                      <Strong>Hometown:</Strong> {titleCase(hometown)}
                    </span>
                  )}
                  {school && (
                    <span>
                      <Strong>University / School:</Strong> {titleCase(school)}
                    </span>
                  )}
                  {gender && (
                    <span>
                      <Strong>Gender:</Strong> {titleCase(gender)}
                    </span>
                  )}
                </Paragraph>
              </InfoCard>
            </Card>
            {accommodationChecklist && accommodationChecklist.length && (
              <Card>
                <InfoCard>
                  <SubHeadline>About my home</SubHeadline>
                  <List>
                    {accommodationChecklist.map(li => (
                      <ListItem key={li}>{li}</ListItem>
                    ))}
                  </List>
                </InfoCard>
              </Card>
            )}
            {otherInfo && (
              <Card>
                <InfoCard>
                  <SubHeadline>Other Info / House Rules</SubHeadline>
                  <Paragraph>{otherInfo}</Paragraph>
                </InfoCard>
              </Card>
            )}

            {address && description && (
              <Card>
                <InfoCard>
                  <SubHeadline>My PressPad Offer</SubHeadline>
                  <ParagraphHeadline>
                    {`${address.street}, ${address.city}, ${address.postcode}`}
                  </ParagraphHeadline>
                  <Paragraph>{description}</Paragraph>
                </InfoCard>
              </Card>
            )}
            {(hostingReasonAnswer ||
              mentoringExperienceAnswer ||
              industryExperienceAnswer) && (
              <Card>
                <InfoCard>
                  <SubHeadline>More about me</SubHeadline>
                  {hostingReasonAnswer && (
                    <>
                      <ParagraphHeadline>
                        Why I want to be a PressPad host
                      </ParagraphHeadline>
                      <Paragraph>{hostingReasonAnswer}</Paragraph>
                    </>
                  )}
                  {mentoringExperienceAnswer && (
                    <>
                      <ParagraphHeadline>
                        My mentoring experience
                      </ParagraphHeadline>
                      <Paragraph>{mentoringExperienceAnswer}</Paragraph>
                    </>
                  )}
                  {industryExperienceAnswer && (
                    <>
                      <ParagraphHeadline>
                        My experience getting into the industry
                      </ParagraphHeadline>
                      <Paragraph>{industryExperienceAnswer}</Paragraph>
                    </>
                  )}
                  {backgroundAnswer && (
                    <>
                      <ParagraphHeadline>
                        My experience getting into the industry
                      </ParagraphHeadline>
                      <Paragraph>{backgroundAnswer}</Paragraph>
                    </>
                  )}
                </InfoCard>
              </Card>
            )}
          </TextContentDiv>
          <AvailableHosting>
            <Card>
              <CalendarDiv userRole={role}>
                {role === "host" && (
                  <SubHeadline>Your available Dates</SubHeadline>
                )}
                {role !== "host" && (
                  <>
                    <SubHeadline>Available hosting</SubHeadline>
                    <ParagraphHeadline>
                      Choose a slot to view price and request a stay with this
                      host
                    </ParagraphHeadline>
                  </>
                )}
                <Calendar
                  currentUserId={currentUserId}
                  hostId={hostId}
                  role={role}
                  listingId={_id}
                  availableDates={availableDates}
                  internBookings={internBookings}
                  price={price}
                  adminView={role === "admin"}
                  getHostProfile={this.getHostProfile}
                />
              </CalendarDiv>
            </Card>
          </AvailableHosting>
        </MainSection>
      </Wrapper>
    );
  }
}
/* {reviews.length > 0 && (
  <Card>
    <Reviews>
      <SubHeadline>Reviews</SubHeadline>
      <ReviewsSection>
        {reviews.map(re => (
          <ReviewsBox key={re._id}>
            <ReviewsHeader>
              <StarRate disabled defaultValue={re.rating} />
              <ReviewHeadline>
                {`${re.from.name.split(" ")[0]},
                ${re.from.profile.jobTitle}`}
              </ReviewHeadline>
            </ReviewsHeader>
            <ReviewText>{re.message}</ReviewText>
          </ReviewsBox>
        ))}
      </ReviewsSection>
      <MoreReviewsLink to="/">read more reviews</MoreReviewsLink>
    </Reviews>
  </Card>
)} */

export default HostProfile;
