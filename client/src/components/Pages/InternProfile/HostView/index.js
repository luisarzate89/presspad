/* eslint-disable global-require */
import React, { Component } from "react";
import { Spin, Icon, message } from "antd";
import axios from "axios";
import moment from "moment";

import { API_INTERN_PROFILE_URL } from "../../../../constants/apiRoutes";

import Reviews from "../../../Common/Reviews";

// styles
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
  Card,
} from "../../../Common/Profile/Profiles.style";

import {
  MainSection,
  MoreAboutSection,
  BioSection,
  ProfilePicDiv,
  SymbolDiv,
  Symbol,
  SymbolHeadline,
  SymbolContainer,
  IconDiv,
  AboutSection,
  AboutSectionDataContainer,
  AboutSectionDataRow,
  AboutSectionDataCell,
} from "./HostView.style";

import {
  useReasonQuestion,
  issueQuestion,
  storyQuestion,
  mentorDescribeQuestion,
} from "./questions.json";

import "antd/dist/antd.css";

import referIcon from "../../../../assets/refer.svg";
import verifiedIcon from "../../../../assets/verified.svg";

class HostView extends Component {
  state = {
    isLoading: true,
    internData: null,
  };

  componentDidMount() {
    const { id: internId } = this.props.match.params;
    axios
      .get(`${API_INTERN_PROFILE_URL.replace(":id", internId)}`)
      .then(({ data: internData }) => {
        this.setState({
          isLoading: false,
          internData,
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
    const { id: internId } = this.props.match.params;

    const {
      name,
      birthDate,
      profileImage,
      bio,
      school,
      hometown,
      interests: areaOfInterest,
      gender,
      organisation,
      useReasonAnswer,
      issueAnswer,
      storyAnswer,
      mentorDescribeAnswer,
      verified,
      referencesNum,
    } = internData;

    return (
      <Wrapper>
        {/* Backlink */}
        <LinkDiv>
          <BackLinkDiv
            role="button"
            onClick={() => this.props.history.goBack()}
          >
            <Arrow />
            <BackLink>Back</BackLink>
          </BackLinkDiv>
        </LinkDiv>
        <Header>
          <ProfilePicDiv src={this.getProfilePic(profileImage)} />
          <HeaderDiv>
            <Headline>{name}</Headline>
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
                <SymbolHeadline>{referencesNum} References</SymbolHeadline>
                <IconDiv>
                  <Icon type="info-circle" />
                </IconDiv>
              </SymbolContainer>
            </SymbolDiv>
          </HeaderDiv>
        </Header>
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

        <MoreAboutSection style={{ marginTop: "3rem" }}>
          <Card>
            <Reviews userId={internId} />
          </Card>
        </MoreAboutSection>
      </Wrapper>
    );
  }
}

export default HostView;
