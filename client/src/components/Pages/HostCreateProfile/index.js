import { Alert, message, Modal } from "antd";
import axios from "axios";
import React, { Component } from "react";
import {
  API_HOST_COMPLETE_PROFILE,
  API_MY_PROFILE_URL,
  DASHBOARD_URL,
} from "../../../constants/apiRoutes";
import Content from "./Content";
import {
  checkSelectedRange,
  disabledEndDate,
  disabledStartDate,
  getValidDAtes,
} from "./helpers";
import { detailsSchema, offerSchema, profileSchema } from "./Schema";

const INITIAL_STATE = {
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
};
const TABS = { PROFILE: "Profile", OFFER: "Offer", DETAILS: "Details" };

export default class HostCreateProfile extends Component {
  state = {
    activeKey: TABS.PROFILE,
    availableDates: [
      {
        startDate: null,
        endDate: null,
        endOpen: false,
      },
    ],
    validData: {},
    data: INITIAL_STATE,
    errors: INITIAL_STATE,
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
      this.setState(({ data, errors }) => ({
        data: {
          ...data,
          [parent]: { ...data[parent], [key]: value },
        },
        errors: { ...errors, [parent]: { ...errors[parent], [key]: null } },
      }));
    } else {
      this.setState(({ data, errors }) => ({
        data: {
          ...data,
          [key]: value,
        },
        errors: { ...errors, [key]: null },
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

  handleValidationError = ({ inner }) => {
    const newErrors = {};
    inner.forEach(({ path, message: errorMessage }) => {
      if (path.includes(".")) {
        const [parent, childrenPath] = path.split(".");
        newErrors[path] = newErrors[path] || {};
        newErrors[parent] = {
          ...newErrors[parent],
          [childrenPath]: errorMessage,
        };
      } else {
        newErrors[path] = errorMessage;
      }
    });
    return newErrors;
  };

  onChangeTabs = async newKey => {
    // TODO: run validation
    window.scrollTo(0, 0);
    const { activeKey, data, availableDates } = this.state;
    if (newKey === TABS.DETAILS && activeKey !== TABS.OFFER) return;
    try {
      if (activeKey === TABS.PROFILE)
        await profileSchema.validate({ ...data }, { abortEarly: false });
      if (activeKey === TABS.OFFER && newKey !== TABS.PROFILE)
        await offerSchema.validate(
          { ...data, availableDates },
          { abortEarly: false },
        );
      this.setState({ activeKey: newKey });
    } catch (e) {
      this.setState(({ errors }) => ({
        errors: { ...errors, ...this.handleValidationError(e) },
      }));
    }
  };

  handleSubmit = async () => {
    // TODO: run validation
    try {
      await detailsSchema.validate(
        { ...this.state.data },
        { abortEarly: false },
      );
    } catch (e) {
      this.setState(({ errors }) => ({
        errors: { ...errors, ...this.handleValidationError(e) },
      }));
      return;
    }
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
        this.setState({ loading: false });
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
        this.setState({ loading: false });
      });
    window.scrollTo(0, 0);
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
    const { name, id, role } = this.props;
    const { errors, data, activeKey, availableDates } = this.state;

    const {
      profileImage: { url: profilePhotoUrl },
    } = data;
    return (
      <Content
        name={name}
        errors={errors}
        data={data}
        handleChange={this.handleChange}
        handleError={this.handleError}
        userId={id}
        onChangeTabs={this.onChangeTabs}
        activeKey={activeKey}
        handleSubmit={this.handleSubmit}
        profilePhotoUrl={profilePhotoUrl}
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
    );
  }
}
