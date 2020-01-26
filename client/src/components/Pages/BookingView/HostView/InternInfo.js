import React, { Component } from "react";
import { Skeleton, Icon, message, Alert } from "antd";
import axios from "axios";
import moment from "moment";

import { API_INTERN_PROFILE_URL } from "../../../../constants/apiRoutes";

// styles
import { BlueLink } from "../../../Common/general";
import {
  Header,
  HeaderDiv,
  InnerCard,
  Headline,
  SubHeadline,
  Paragraph,
  Card,
} from "../../../Common/Profile/Profiles.style";

import {
  MainSection,
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

import "antd/dist/antd.css";

import referIcon from "../../../../assets/refer.svg";
import verifiedIcon from "../../../../assets/verified.svg";

class InternInfo extends Component {
  state = {
    isLoading: true,
    internData: {
      name: "",
      birthDate: "",
      profileImage: null,
      bio: "",
      school: "",
      hometown: "",
      interests: "",
      gender: "",
      organisation: "",
      useReasonAnswer: "",
      issueAnswer: "",
      storyAnswer: "",
      mentorDescribeAnswer: "",
      verified: false,
      referencesNum: 0,
    },
    error: "",
  };

  async componentDidMount() {
    const { internId } = this.props;
    try {
      this.setState({ isLoading: true });
      const { data: internData } = await axios.get(
        `${API_INTERN_PROFILE_URL.replace(":id", internId)}`,
      );
      this.setState({
        isLoading: false,
        error: "",
        internData,
      });
    } catch (err) {
      const error =
        (err.response && err.response.data && err.response.data.error) ||
        "Something went wrong";
      message.error(error || "Something went wrong");
      this.setState({ isLoading: false, error });
    }
  }

  getProfilePic = img =>
    img && img.length > 0
      ? img
      : // eslint-disable-next-line global-require
        require("./../../../../assets/random-profile.jpg");

  render() {
    const { internId } = this.props;
    const { internData, isLoading, error } = this.state;

    if (isLoading) {
      return (
        <MainSection>
          <Skeleton active avatar={{ size: 160, shape: "square" }} />
        </MainSection>
      );
    }

    if (error)
      return <Alert message="Intern info" description={error} type="error" />;

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
      verified,
      referencesNum,
    } = internData;

    return (
      <>
        <Header>
          <ProfilePicDiv src={this.getProfilePic(profileImage)} />
          <HeaderDiv>
            <Headline style={{ marginBottom: "1rem" }}>{name}</Headline>
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
                <SubHeadline>{name.split(" ")[0]}&apos;s Bio</SubHeadline>
                <Paragraph>{bio}</Paragraph>
              </InnerCard>
            </Card>
          </BioSection>
        </MainSection>
        <BlueLink
          style={{ width: "100%", textAlign: "center", margin: "2rem 0" }}
          to={`/interns/${internId}`}
        >
          Show more about Andrew
        </BlueLink>
      </>
    );
  }
}

export default InternInfo;
