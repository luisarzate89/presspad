import React from "react";
import axios from "axios";
import { message } from "antd";

import {
  AboutYouProfile,
  OtherInformationProfile,
  AboutYouDetails,
  OtherInformationDetails,
  Demographic,
} from "../../../Common/ProfileComponents";
import TabbedView from "../../../Common/TabbedView";
import { BackLinkDiv, Arrow, BlueLink } from "./InternProfile.style";

import {
  PageWrapper,
  ContentWrapper,
} from "../../InternCreateProfile/InternCreateProfile.style";
import { API_ADMIN_INTERN_PROFILE } from "../../../../constants/apiRoutes";

export default class AdminView extends React.Component {
  state = {
    activeKey: "Profile",
    data: {
      birthDate: null,
      hometown: null,
      gender: null,
      school: null,
      profileImage: {
        fileName: null,
        isPrivate: false,
      },
      interests: null,
      bio: null,
      organisation: null,
      useReasonAnswer: null,
      issueAnswer: null,
      mentorDescribeAnswer: null,
      photoID: {
        fileName: null,
        isPrivate: true,
        url: null,
      },
      hearAboutPressPadAnswer: null,
      phoneNumber: null,
      reference1: {
        name: null,
        email: null,
      },
      reference2: {
        name: null,
        email: null,
      },
      offerLetter: {
        fileName: null,
        isPrivate: true,
      },
      internshipOfficeAddress: null,
      emergencyContact: {
        name: null,
        phoneNumber: null,
        email: null,
      },
      DBSCheck: {
        fileName: null,
        isPrivate: true,
      },
      sexualOrientation: null,
      degreeLevel: null,
      ethnicity: null,
      parentProfession: null,
      disability: null,
      parentsWorkInPress: null,
      caringResponsibilities: null,
      allergies: null,
      backgroundAnswer: null,
      consentedOnPressPadTerms: null,
    },
  };

  componentDidMount() {
    const { userId } = this.props;
    axios
      .get(API_ADMIN_INTERN_PROFILE.replace(":id", userId))
      .then(({ data: { profile } }) => {
        if (profile) {
          this.setState(prevState => ({
            data: {
              ...prevState.data,
              ...profile,
            },
          }));
        }
      })
      .catch(() => message.error("Internal Server Error"));
  }

  onChangeTabs = activeKey => {
    this.setState({ activeKey });
  };

  render() {
    const { userId, goBack, name } = this.props;
    const { data, activeKey } = this.state;

    const handleChange = _ => _;

    const role = "intern";

    return (
      <PageWrapper>
        <ContentWrapper>
          <BackLinkDiv>
            <Arrow />
            <BlueLink onClick={goBack}>Back to search results</BlueLink>
          </BackLinkDiv>
          <TabbedView
            activeKey={activeKey}
            onChange={this.onChangeTabs}
            tabsTitle={["Profile", "Details"]}
            tabsContent={[
              <>
                <AboutYouProfile
                  data={data}
                  name={name}
                  errors={{}}
                  handleChange={handleChange}
                  handleError={handleChange}
                  userId={userId}
                  role={role}
                  isAdmin
                />
                <OtherInformationProfile
                  data={data}
                  errors={{}}
                  handleChange={handleChange}
                  handleError={handleChange}
                  userId={userId}
                  role={role}
                  isAdmin
                />
              </>,
              <>
                <AboutYouDetails
                  data={data}
                  name={name}
                  errors={{}}
                  handleChange={handleChange}
                  handleError={handleChange}
                  userId={userId}
                  role={role}
                  isAdmin
                />
                <OtherInformationDetails
                  data={data}
                  errors={{}}
                  handleChange={handleChange}
                  handleError={handleChange}
                  userId={userId}
                  role={role}
                  isAdmin
                />
                <Demographic
                  data={data}
                  errors={{}}
                  handleChange={handleChange}
                  handleError={handleChange}
                  userId={userId}
                  role={role}
                  isAdmin
                />
              </>,
            ]}
          />
        </ContentWrapper>
      </PageWrapper>
    );
  }
}
