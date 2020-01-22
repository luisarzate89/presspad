import React, { Component } from "react";
import { Spin, Icon, message } from "antd";
import axios from "axios";
import moment from "moment";

import { API_INTERN_PROFILE_URL } from "./../../../../constants/apiRoutes";

//styles
import {
  Wrapper,
  LinkDiv,
  BackLinkDiv,
  Arrow,
  BackLink,
  Header,
  HeaderDiv,
  InnerCard,
  Headline,
  SubHeadline,
  ParagraphHeadline,
  Paragraph,
  Card
} from "../../../Common/Profile/Profiles.style";

import {
  MainSection,
  MoreAboutSection,
  BioSection,
  JobTitle,
  ProfilePicDiv,
  SymbolDiv,
  Symbol,
  SymbolHeadline,
  SymbolContainer,
  IconDiv,
  BioContainer,
  AboutSection,
  AboutSectionDataContainer,
  AboutSectionDataRow,
  AboutSectionDataCell
} from "./HostView.style";

import {
  useReasonQuestion,
  issueQuestion,
  storyQuestion,
  mentorDescribeQuestion
} from "./questions.json";

import "antd/dist/antd.css";

import referIcon from "./../../../../assets/refer.svg";
import verifiedIcon from "./../../../../assets/verified.svg";

class HostView extends Component {
  state = {
    isLoading: true,
    moneyGoTo: "host",
    internData: null,
    reviews: null
  };

  componentWillMount() {
    const { id: internId } = this.props.match.params;
    axios
      .get(
        `${API_INTERN_PROFILE_URL.replace(
          ":id",
          internId
        )}?expand=bookings&expand=reviews`
      )
      .then(({ data }) => {
        const { internData, reviews, nextBooking } = data;
        this.setState({
          isLoading: false,
          internData,
          reviews,
          nextBooking
        });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  }

  getProfilePic = img =>
    img && img.length > 0
      ? img
      : require("./../../../../assets/random-profile.jpg");

  render() {
    if (this.state.isLoading) return <Spin tip="Loading Request" />;

    const { internData } = this.state;

    const { name, profile } = internData;

    const {
      bio,
      jobTitle,
      profileImage,
      verified,
      organisation,
      gender,
      birthDate,
      hometown,
      university: school,
      areaOfInterest,
      useReasonAnswer,
      issueAnswer,
      storyAnswer,
      mentorDescribeAnswer,
      reference1,
      reference2
    } = profile;

    const referencesLength =
      ((reference1 && reference1.name && 1) || 0) +
      ((reference2 && reference2.name && 1) || 0);

    return (
      <Wrapper>
        {/* Backlink */}
        <LinkDiv>
          <BackLinkDiv>
            <BackLink to="/">
              <Arrow /> Back
            </BackLink>
          </BackLinkDiv>
        </LinkDiv>
        {/* Header */}
        <Header flex>
          <ProfilePicDiv src={this.getProfilePic(profileImage)} />
          <HeaderDiv>
            <Headline>{name}</Headline>
            <JobTitle>{jobTitle}</JobTitle>
            <SymbolDiv>
              {verified ? (
                <SymbolContainer>
                  <Symbol src={verifiedIcon} />
                  <SymbolHeadline>Verified</SymbolHeadline>
                </SymbolContainer>
              ) : (
                <SymbolContainer>
                  <Symbol src={verifiedIcon} />
                  <SymbolHeadline>Not Verified</SymbolHeadline>
                </SymbolContainer>
              )}

              <SymbolContainer>
                <Symbol src={referIcon} />
                <SymbolHeadline>{referencesLength} References</SymbolHeadline>
                <IconDiv>
                  <Icon type="info-circle" />
                </IconDiv>
              </SymbolContainer>
            </SymbolDiv>
            <BioContainer>
              <Paragraph>{bio}</Paragraph>
            </BioContainer>
          </HeaderDiv>
        </Header>
        {/* Main section */}
        <MainSection>
          <AboutSection>
            <Card mt="30px" mh="450px">
              <InnerCard>
                <SubHeadline>About {name.split(" ")[0]}</SubHeadline>
                <AboutSectionDataContainer>
                  {!!name && (
                    <AboutSectionDataRow>
                      <AboutSectionDataCell bold>Name:</AboutSectionDataCell>
                      <AboutSectionDataCell>{name}</AboutSectionDataCell>
                    </AboutSectionDataRow>
                  )}
                  {!!birthDate && (
                    <AboutSectionDataRow>
                      <AboutSectionDataCell bold>
                        Date of birth:
                      </AboutSectionDataCell>
                      <AboutSectionDataCell>
                        {moment(birthDate).format("DD/MM/YYYY")}
                      </AboutSectionDataCell>
                    </AboutSectionDataRow>
                  )}
                  {!!gender && (
                    <AboutSectionDataRow>
                      <AboutSectionDataCell bold>Gender:</AboutSectionDataCell>
                      <AboutSectionDataCell>{gender}</AboutSectionDataCell>
                    </AboutSectionDataRow>
                  )}
                  {!!school && (
                    <AboutSectionDataRow>
                      <AboutSectionDataCell bold>
                        University / School:
                      </AboutSectionDataCell>
                      <AboutSectionDataCell>{school}</AboutSectionDataCell>
                    </AboutSectionDataRow>
                  )}
                  {!!hometown && (
                    <AboutSectionDataRow>
                      <AboutSectionDataCell bold>
                        Hometown:
                      </AboutSectionDataCell>
                      <AboutSectionDataCell>{hometown}</AboutSectionDataCell>
                    </AboutSectionDataRow>
                  )}
                  {!!areaOfInterest && (
                    <AboutSectionDataRow>
                      <AboutSectionDataCell bold>
                        Area of interest:
                      </AboutSectionDataCell>
                      <AboutSectionDataCell>
                        {areaOfInterest}
                      </AboutSectionDataCell>
                    </AboutSectionDataRow>
                  )}
                  {!!organisation && !!organisation.name && (
                    <>
                      <AboutSectionDataRow pushDown>
                        <AboutSectionDataCell bold fullWidth>
                          Organisation they are or are going to be working for /
                          interning for:
                        </AboutSectionDataCell>
                      </AboutSectionDataRow>
                      <AboutSectionDataRow>
                        <AboutSectionDataCell>
                          {organisation.name}
                        </AboutSectionDataCell>
                      </AboutSectionDataRow>
                    </>
                  )}
                </AboutSectionDataContainer>
              </InnerCard>
            </Card>
          </AboutSection>
          <BioSection>
            <Card mt="30px" mh="450px">
              <InnerCard>
                <SubHeadline>{name.split(" ")[0]}'s Bio</SubHeadline>
                <Paragraph>{bio}</Paragraph>
              </InnerCard>
            </Card>
          </BioSection>
        </MainSection>
        <MoreAboutSection>
          <Card mt="30px" mh="450px">
            <InnerCard>
              <SubHeadline>More About {name.split(" ")[0]}</SubHeadline>
              <ParagraphHeadline bold>{useReasonQuestion}</ParagraphHeadline>
              <Paragraph>
                {useReasonAnswer || "Answer is not available"}
              </Paragraph>
              <ParagraphHeadline bold>{issueQuestion}</ParagraphHeadline>
              <Paragraph>{issueAnswer || "Answer is not available"}</Paragraph>
              <ParagraphHeadline bold>{storyQuestion}</ParagraphHeadline>
              <Paragraph>{storyAnswer || "Answer is not available"}</Paragraph>
              <ParagraphHeadline bold>
                {mentorDescribeQuestion}
              </ParagraphHeadline>
              <Paragraph>
                {mentorDescribeAnswer || "Answer is not available"}
              </Paragraph>
            </InnerCard>
          </Card>
        </MoreAboutSection>
      </Wrapper>
    );
  }
}

export default HostView;
