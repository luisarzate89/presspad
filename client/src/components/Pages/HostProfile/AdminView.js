import React, { Component } from "react";

import axios from "axios";
import { message } from "antd";
import { API_ADMIN_HOST_PROFILE } from "../../../constants/apiRoutes";

import {
  disabledStartDate,
  disabledEndDate,
} from "../HostCreateProfile/helpers";

import {
  AboutYouProfile,
  OfferDetails,
  Details,
  OtherInformation,
  Demographic,
} from "../HostCreateProfile/ProfileComponents";

import TabbedView from "../../Common/TabbedView";

import {
  PageWrapper,
  ContentWrapper,
} from "../HostCreateProfile/HostCreateProfile.style";

import {
  BackLinkDiv,
  Arrow,
  BlueLink,
} from "../InternProfile/AdminOrInternView/InternProfile.style";

export default class AdminView extends Component {
  state = {
    activeKey: "Profile",
    availableDates: [
      {
        startDate: null,
        endDate: null,
        endOpen: false,
      },
    ],
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
      jobTitle: null,
      organisation: null,
      workingArea: null,
      hostingReasonAnswer: null,
      mentoringExperienceAnswer: null,
      industryExperienceAnswer: null,
      backgroundAnswer: null,
      photos1: {
        fileName: null,
        isPrivate: false,
      },
      photos2: {
        fileName: null,
        isPrivate: false,
      },
      photos3: {
        fileName: null,
        isPrivate: false,
      },
      address: null,
      accommodationChecklist: [],
      neighbourhoodDescription: null,
      otherInfo: null,
      photoID: {
        fileName: null,
        isPrivate: true,
        url: null,
      },
      hearAboutPressPadAnswer: null,
      reference1: {
        name: null,
        email: null,
      },
      reference2: {
        name: null,
        email: null,
      },
      DBSCheck: {
        fileName: null,
        isPrivate: true,
      },
      pressCard: {
        fileName: null,
        isPrivate: false,
      },
      sexualOrientation: null,
      degreeLevel: null,
      ethnicity: null,
      earningOfParents: null,
      disability: null,
      parentsWorkInPress: null,
      caringResponsibilities: null,
    },
  };

  componentDidMount() {
    const { hostId } = this.props;
    axios
      .get(API_ADMIN_HOST_PROFILE.replace(":id", hostId), {
        params: { role: "host" },
      })
      .then(
        ({
          data: {
            profile,
            listing: {
              photos: [photos1, photos2, photos3],
              availableDates = [],
              ...restListing
            },
          },
        }) => {
          if (profile) {
            this.setState(prevState => ({
              data: {
                ...prevState,
                ...profile,
                ...restListing,
                photos1,
                photos2,
                photos3,
              },
              availableDates,
            }));
          }
        },
      )
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  }

  handleChange = ({ value, key, parent }) => {
    if (parent) {
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          [parent]: { ...prevState.data[parent], [key]: value },
        },
      }));
    } else {
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          [key]: value,
        },
      }));
    }
  };

  handleError = ({ value, key, parent }) => {
    if (parent) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [parent]: { ...prevState.errors[parent], [key]: value },
        },
      }));
    } else {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [key]: value,
        },
      }));
    }
  };

  onChangeTabs = activeKey => {
    // TODO: run validation
    this.setState({ activeKey });
  };

  render() {
    const { triggerHostView, userId, hostName = "" } = this.props;
    const { errors, data, activeKey, availableDates } = this.state;

    const handleChange = _ => _;
    const role = "admin";
    return (
      <PageWrapper>
        <ContentWrapper>
          <BackLinkDiv>
            <Arrow />
            <BlueLink onClick={triggerHostView}>
              back to search results
            </BlueLink>
          </BackLinkDiv>
          <TabbedView
            activeKey={activeKey}
            onChange={this.onChangeTabs}
            tabsTitle={["Profile", "Offer", "Details"]}
            tabsContent={[
              <>
                <AboutYouProfile
                  data={data}
                  name={hostName}
                  errors={errors}
                  handleChange={handleChange}
                  handleError={handleChange}
                  userId={userId}
                  role={role}
                  isAdmin
                />
              </>,
              <>
                <OfferDetails
                  data={data}
                  errors={errors}
                  handleChange={handleChange}
                  handleError={handleChange}
                  userId={userId}
                  role={role}
                  // dates
                  disabledStartDate={disabledStartDate}
                  disabledEndDate={disabledEndDate}
                  onEndChange={handleChange}
                  onStartChange={handleChange}
                  handleAddMoreRanges={handleChange}
                  deleteDate={handleChange}
                  availableDates={availableDates}
                  isAdmin
                  name={hostName}
                />
              </>,
              <>
                <Details
                  data={data}
                  errors={errors}
                  handleChange={handleChange}
                  handleError={handleChange}
                  userId={userId}
                  role={role}
                  isAdmin
                  name={hostName}
                />

                <OtherInformation
                  data={data}
                  errors={errors}
                  handleChange={handleChange}
                  handleError={handleChange}
                  userId={userId}
                  role={role}
                  isAdmin
                />

                <Demographic
                  data={data}
                  errors={errors}
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
