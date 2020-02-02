import React, { Component } from 'react';
import { Spin, message, Icon } from 'antd';

import axios from 'axios';
import {
  API_VERIFY_PROFILE_URL,
  API_GET_USER_BOOKINGS_URL,
} from '../../../constants/apiRoutes';

import { HOST_COMPLETE_PROFILE_URL } from '../../../constants/navRoutes';
import Reviews from '../../Common/Reviews';

import Calendar from './Calendar';

import Button from '../../Common/Button';
import ListingGallery from '../../Common/Profile/ListingGallery';

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
} from '../../Common/Profile/Profiles.style';

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
  MobileSubHeadline,
} from './Profile.style';
import { titleCase, truncatePostcode } from '../../../helpers';
import 'antd/dist/antd.css';

import starSign from '../../../assets/star-sign-symbol.svg';
import profilePlaceholder from '../../../assets/random-profile.jpg';

export default class InternView extends Component {
  state = {
    isLoading: true,
    profileData: null,
    internBookings: [],
    expandDateSection: false,
    showFullData: false,
  };

  componentDidMount() {
    const { role } = this.props;

    this.getHostProfile();
    if (role !== 'admin') {
      axios
        .get(API_GET_USER_BOOKINGS_URL.replace(':id', this.props.id))
        .then(result => this.setState({ internBookings: result.data }))
        .catch(err => message.error(err || 'Something went wrong'));
    }
  }

  getHostProfile = () => {
    const { match, history, role } = this.props;
    let hostId = match.params.id;
    if (!hostId && match.path === '/my-profile') {
      hostId = this.props.id;
    }

    axios
      .get(`/api/host/${hostId}`)
      .then(({ data }) => {
        if (data.profile) {
          this.setState({
            isLoading: false,
            profileData: data,
            showFullData: data.showFullData,
          });
        }
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        if (
          error === 'User has no profile' &&
          ['host', 'superhost'].includes(role)
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
          message.error(error || 'Something went wrong');
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
      .catch(err => message.error(err || 'Something went wrong'));
  };

  toggleDateSection = () => {
    const { expandDateSection } = this.state;
    this.setState({ expandDateSection: !expandDateSection });
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
          address: {
            addressline1 = '',
            addressline2 = '',
            postcode = '',
            city = '',
          } = {},
          photos,
          otherInfo,
          accommodationChecklist,
          neighbourhoodDescription,
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
          workingArea,
        },
        name,
      },
      internBookings,
      showFullData,
      expandDateSection,
    } = this.state;

    const { match, id: currentUserId, role, windowWidth } = this.props;
    const { id: hostId } = match.params;

    return (
      <Wrapper>
        <LinkDiv>
          <BackLinkDiv
            onClick={() => this.props.history.goBack()}
            role="button"
          >
            <Arrow />
            <BackLink>Go Back</BackLink>
          </BackLinkDiv>
        </LinkDiv>
        <Header>
          <TopDiv>
            <ProfilePic
              src={profileImage.url || profilePlaceholder}
              adminView={role === 'admin' || userId === currentUserId || !!name}
              onError={this.handleImageFail}
              blur={!showFullData}
            />
            <HeaderDiv>
              {role === 'admin' ? (
                <Headline>{name || 'Anonymous'}</Headline>
              ) : (
                <Headline>
                  {name
                    ? `${name} (${jobTitle &&
                        `A ${titleCase(jobTitle)} ${organisation &&
                          `at ${titleCase(organisation)}`}`})`
                    : jobTitle &&
                      `A ${titleCase(jobTitle)} ${
                        organisation ? `at ${titleCase(organisation)}` : ''
                      }`}
                </Headline>
              )}
              <Address>
                {city} {showFullData ? postcode : truncatePostcode(postcode)}
              </Address>
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
                <Paragraph style={{ display: 'flex', flexDirection: 'column' }}>
                  {hometown && (
                    <span style={{ marginTop: '0.5rem' }}>
                      <Strong>Hometown:</Strong> {titleCase(hometown)}
                    </span>
                  )}

                  {showFullData && (
                    <div style={{ display: 'flex', marginTop: '0.5rem' }}>
                      <Strong>Address:</Strong>{' '}
                      <div
                        style={{ display: 'inline-block', paddingLeft: '1rem' }}
                      >
                        <div>{titleCase(addressline1)}</div>
                        {addressline2 && <div>{titleCase(addressline2)}</div>}
                        <div>{titleCase(city)}</div>
                        <div>{postcode}</div>
                      </div>
                    </div>
                  )}

                  {school && (
                    <span style={{ marginTop: '0.5rem' }}>
                      <Strong>University / School:</Strong> {titleCase(school)}
                    </span>
                  )}
                  {gender && (
                    <span style={{ marginTop: '0.5rem' }}>
                      <Strong>Gender:</Strong> {titleCase(gender)}
                    </span>
                  )}
                  {workingArea && (
                    <span style={{ marginTop: '0.5rem' }}>
                      <Strong>Working Area:</Strong> {titleCase(workingArea)}
                    </span>
                  )}
                </Paragraph>
              </InfoCard>
            </Card>
            <Card>
              <InfoCard>
                <SubHeadline>About my home</SubHeadline>
                {accommodationChecklist && accommodationChecklist.length && (
                  <List>
                    {accommodationChecklist.map(li => (
                      <ListItem key={li}>{li}</ListItem>
                    ))}
                  </List>
                )}

                <SubHeadline>The Neighbourhood</SubHeadline>
                <Paragraph>{neighbourhoodDescription || 'N/A'}</Paragraph>

                <SubHeadline>Other Info / House Rules</SubHeadline>
                <Paragraph>{otherInfo || 'N/A'}</Paragraph>
              </InfoCard>
            </Card>

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
                        Something you should know
                      </ParagraphHeadline>
                      <Paragraph>{backgroundAnswer}</Paragraph>
                    </>
                  )}
                </InfoCard>
              </Card>
            )}
            <Card>
              <Reviews userId={userId} name={name} userRole="host" />
            </Card>
          </TextContentDiv>
          {windowWidth < 776 ? (
            <AvailableHosting mobile expanded={expandDateSection}>
              {expandDateSection ? (
                <Card mobile>
                  <Icon
                    type="close"
                    style={{
                      fontSize: '32px',
                      color: 'primary',
                      cursor: 'pointer',
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                    }}
                    onClick={this.toggleDateSection}
                  />
                  <CalendarDiv userRole={role}>
                    {role === 'host' && (
                      <SubHeadline>Your available Dates</SubHeadline>
                    )}
                    {role !== 'host' && (
                      <>
                        <MobileSubHeadline>Available hosting</MobileSubHeadline>
                        <ParagraphHeadline>
                          Choose a slot to view price and request a stay with
                          this host
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
                      adminView={role === 'admin'}
                      getHostProfile={this.getHostProfile}
                    />
                  </CalendarDiv>
                </Card>
              ) : (
                <Card mobileSmall>
                  <MobileSubHeadline>
                    View available dates & price to stay
                  </MobileSubHeadline>
                  <Button
                    type="secondary"
                    label="View dates"
                    width="180px"
                    onClick={this.toggleDateSection}
                  />
                </Card>
              )}
            </AvailableHosting>
          ) : (
            <AvailableHosting>
              <Card>
                <CalendarDiv userRole={role}>
                  {role === 'host' && (
                    <SubHeadline>Your available Dates</SubHeadline>
                  )}
                  {role !== 'host' && (
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
                    adminView={role === 'admin'}
                    getHostProfile={this.getHostProfile}
                  />
                </CalendarDiv>
              </Card>
            </AvailableHosting>
          )}
        </MainSection>
      </Wrapper>
    );
  }
}
