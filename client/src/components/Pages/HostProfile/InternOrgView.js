import React, { Component } from "react";
import { Spin, message } from "antd";

import axios from "axios";
import {
  API_VERIFY_PROFILE_URL,
  API_GET_USER_BOOKINGS_URL,
} from "../../../constants/apiRoutes";

import { HOST_COMPLETE_PROFILE_URL } from "../../../constants/navRoutes";

import Calendar from "./Calendar";

import ListingGallery from "../../Common/Profile/ListingGallery";

import {
  Wrapper,
  LinkDiv,
  BackLinkDiv,
  TopDiv,
  Arrow,
  BackLink,
  Header,
  HeaderDiv,
  Headline,
  SubHeadline,
  ParagraphHeadline,
  Paragraph,
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
} from "./Profile.style";
import { titleCase } from "../../../helpers";
import "antd/dist/antd.css";

import starSign from "../../../assets/star-sign-symbol.svg";
import profilePlaceholder from "../../../assets/random-profile.jpg";

export default class InternView extends Component {
  state = {
    isLoading: true,
    profileData: null,
    internBookings: [],
  };

  componentDidMount() {
    const { role } = this.props;

    this.getHostProfile();
    if (role !== "admin") {
      axios
        .get(API_GET_USER_BOOKINGS_URL.replace(":id", this.props.id))
        .then(result => this.setState({ internBookings: result.data }))
        .catch(err => message.error(err || "Something went wrong"));
    }
  }

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
            isLoading: false,
            profileData: data,
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
                You don&apos;t have profile
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

  handleImageFail = ({ target }) => {
    // eslint-disable-next-line no-param-reassign
    target.src = profilePlaceholder;
  };

  verifyProfile = (profileId, bool) => {
    axios
      .post(API_VERIFY_PROFILE_URL, { profileId, verify: bool })
      .catch(err => message.error(err || "Something went wrong"));
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
      },
      internBookings,
    } = this.state;

    const { match, id: currentUserId, role } = this.props;
    const { id: hostId } = match.params;

    return (
      <Wrapper>
        <LinkDiv>
          <BackLinkDiv>
            <Arrow />
            <BackLink to="/">Back to Search Results</BackLink>
          </BackLinkDiv>
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
                <SubHeadline>Available hosting</SubHeadline>
                <ParagraphHeadline>
                  Choose a slot to view price and request a stay with this host
                </ParagraphHeadline>

                <Calendar
                  currentUserId={currentUserId}
                  hostId={hostId}
                  role={role}
                  listingId={_id}
                  availableDates={availableDates}
                  internBookings={internBookings}
                  price={price}
                  adminView={role === "admin"}
                />
              </CalendarDiv>
            </Card>
          </AvailableHosting>
        </MainSection>
      </Wrapper>
    );
  }
}
