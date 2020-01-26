import React, { Component } from "react";

import axios from "axios";
import { message, Modal, Alert } from "antd";
import {
  API_MY_PROFILE_URL,
  API_HOST_COMPLETE_PROFILE,
  DASHBOARD_URL,
} from "../../../constants/apiRoutes";

import Button from "../../Common/Button";

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
  disabledStartDate,
  disabledEndDate,
  checkSelectedRange,
  getValidDAtes,
} from "../HostCreateProfile/helpers";
// import { EditButton } from "../InternProfile/AdminOrInternView/InternProfile.style";
import HeaderWrapper from "../HostCreateProfile/HeaderWrapper";

export default class HostView extends Component {
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
      parentProfession: null,
      disability: null,
      parentsWorkInPress: null,
      caringResponsibilities: null,
    },
    errors: {
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
      accommodationChecklist: null,
      neighbourhoodDescription: null,
      otherInfo: null,
      photoID: {
        fileName: null,
        isPrivate: false,
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
      parentProfession: null,
      disability: null,
      parentsWorkInPress: null,
      caringResponsibilities: null,
    },
  };

  componentDidMount() {
    axios
      .get(API_MY_PROFILE_URL)
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

  handleSubmit = () => {
    // TODO: run validation
    const {
      data: { photos1, photos2, photos3 },
      availableDates,
    } = this.state;
    const photos = [
      { fileName: photos1.fileName, isPrivate: false },
      { fileName: photos2.fileName, isPrivate: false },
      { fileName: photos3.fileName, isPrivate: false },
    ];

    const _availableDates = getValidDAtes(availableDates);

    axios
      .post(API_HOST_COMPLETE_PROFILE, {
        ...this.state.data,
        photos,
        availableDates: _availableDates,
      })
      .then(() => {
        Modal.destroyAll();
        Modal.success({
          title: "Done",
          content: (
            <Alert
              message="Thank you"
              description="Your info has been updated"
              type="success"
            />
          ),
          onOk: () => {
            this.props.history.push(DASHBOARD_URL);
          },
          type: "success",
        });
        this.setState({ loading: false, success: true });
      })
      .catch(err => {
        Modal.destroyAll();
        Modal.error({
          title: "Error",
          content: (
            <Alert
              message="Error"
              description={err.response.data.error}
              type="error"
            />
          ),
          type: "error",
        });
        this.setState({ loading: false, erros: err.response.data });
      });
  };

  disabledStartDate = (index, startDate) => {
    const { availableDates } = this.state;
    return disabledStartDate(index, startDate, availableDates);
  };

  disabledEndDate = (index, endDate) => {
    const { availableDates } = this.state;
    return disabledEndDate(index, endDate, availableDates);
  };

  onEndChange = (index, value) => {
    this.changeSelectedDate(index, "endDate", value);
  };

  onStartChange = (index, value) => {
    this.changeSelectedDate(index, "startDate", value);
  };

  changeSelectedDate = (index, field, value) => {
    const { availableDates } = this.state;

    const newAvailableDates = [...availableDates];
    const obj = {
      [field]: value,
    };
    const { startDate } = newAvailableDates[index];

    let isDatePicked;
    if (field === "startDate") {
      obj.endOpen = true;
    } else if (field === "endDate") {
      obj.endOpen = false;

      isDatePicked = checkSelectedRange(startDate, value, newAvailableDates);
    }

    if (isDatePicked) {
      return message.warning("Cannot select intersected ranges");
    }

    newAvailableDates[index] = { ...newAvailableDates[index], ...obj };

    return this.setState(
      { availableDates: newAvailableDates },
      () => this.state.attemptedToSubmit && this.updateErrors(),
    );
  };

  // add new available dates range
  handleAddMoreRanges = () => {
    const { availableDates } = this.state;

    const emptyRanges = availableDates.reduce((prev, curr) => {
      const { endDate, startDate } = curr;
      if (!endDate || !startDate) {
        return true;
      }
      return prev || false;
    }, false);

    if (emptyRanges && availableDates.length > 0) {
      return message.warning("fill the previous ranges");
    }

    const newAvailableDates = [...availableDates];
    newAvailableDates.push({
      startDate: null,
      endDate: null,
      endOpen: false,
    });
    return this.setState({ availableDates: newAvailableDates });
  };

  // remove dates
  deleteDate = dateIndex => {
    const { availableDates } = this.state;
    const filteredAvailableDates = availableDates.filter(
      (date, index) => index !== dateIndex,
    );
    this.setState({ availableDates: filteredAvailableDates });
  };

  render() {
    const { name, id: userId, role } = this.props;
    const { errors, data, activeKey, availableDates } = this.state;

    const {
      profileImage: { url: profilePhotoUrl },
    } = data;
    return (
      <PageWrapper>
        <ContentWrapper>
          {/* <EditButton to="/host-complete-profile">Edit Profile</EditButton> */}
          <HeaderWrapper
            error=""
            imageUrl={profilePhotoUrl}
            name={name}
            loading={0}
          />
          <TabbedView
            activeKey={activeKey}
            onChange={this.onChangeTabs}
            tabsTitle={["Profile", "Offer", "Details"]}
            tabsContent={[
              <>
                <AboutYouProfile
                  data={data}
                  errors={errors}
                  handleChange={this.handleChange}
                  handleError={this.handleError}
                  userId={userId}
                  role={role}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "2rem",
                  }}
                >
                  <Button
                    label="Next"
                    type="primary"
                    onClick={() => this.onChangeTabs("Offer")}
                  />
                </div>
              </>,
              <>
                <OfferDetails
                  data={data}
                  errors={errors}
                  handleChange={this.handleChange}
                  handleError={this.handleError}
                  userId={userId}
                  role={role}
                  // dates
                  disabledStartDate={this.disabledStartDate}
                  disabledEndDate={this.disabledEndDate}
                  onEndChange={this.onEndChange}
                  onStartChange={this.onStartChange}
                  handleAddMoreRanges={this.handleAddMoreRanges}
                  deleteDate={this.deleteDate}
                  availableDates={availableDates}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "2rem",
                  }}
                >
                  <Button
                    label="Next"
                    type="primary"
                    onClick={() => this.onChangeTabs("Details")}
                  />
                </div>
              </>,
              <>
                <Details
                  data={data}
                  errors={errors}
                  handleChange={this.handleChange}
                  handleError={this.handleError}
                  userId={userId}
                  role={role}
                />

                <OtherInformation
                  data={data}
                  errors={errors}
                  handleChange={this.handleChange}
                  handleError={this.handleError}
                  userId={userId}
                  role={role}
                />

                <Demographic
                  data={data}
                  errors={errors}
                  handleChange={this.handleChange}
                  handleError={this.handleError}
                  userId={userId}
                  role={role}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "2rem",
                  }}
                >
                  <Button
                    label="Submit"
                    type="primary"
                    onClick={this.handleSubmit}
                  />
                </div>
              </>,
            ]}
          />
        </ContentWrapper>
      </PageWrapper>
    );
  }
}
