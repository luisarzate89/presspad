import React, { Component } from "react";

import axios from "axios";
import { Modal, Alert, message } from "antd";
import Content from "./Content";
import {
  API_INTERN_COMPLETE_PROFILE,
  API_MY_PROFILE_URL,
} from "../../../constants/apiRoutes";
import { DASHBOARD_URL } from "../../../constants/navRoutes";
import { profileSchema, detailsSchema } from "./Schema";

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
  earningOfParents: null,
  disability: null,
  parentsWorkInPress: null,
  caringResponsibilities: null,
  allergies: null,
  backgroundAnswer: null,
  consentedOnPressPadTerms: null,
};
const Tabs = ["Profile", "Details"];

export default class InternCreateProfile extends Component {
  state = {
    activeKey: 0,
    data: INITIAL_STATE,
    errors: INITIAL_STATE,
  };

  componentDidMount() {
    axios
      .get(API_MY_PROFILE_URL)
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
      .catch(() => message.error("internal server error"));
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

  onChangeTabs = async () => {
    const {
      activeKey,
      data: {
        // first tab state
        birthDate,
        gender,
        hometown,
        school,
        profileImage,
        interests,
        bio,
        organisation,
        useReasonAnswer,
        issueAnswer,
        storyAnswer,
      },
    } = this.state;
    if (!activeKey)
      try {
        const validData = await profileSchema.validate(
          {
            birthDate,
            gender,
            hometown,
            school,
            profileImage,
            interests,
            bio,
            organisation,
            useReasonAnswer,
            issueAnswer,
            storyAnswer,
          },
          { abortEarly: false },
        );
        this.setState(({ data }) => ({ data: { ...data, ...validData } }));
      } catch (err) {
        const { inner } = err;
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

        this.setState(({ errors }) => ({
          errors: { ...errors, ...newErrors },
        }));
        return;
      }
    this.setState(({ activeKey: currTab }) => ({
      activeKey: +!currTab,
    }));
    window.scroll(0, 0);
  };

  handleSubmit = async () => {
    const {
      data: {
        // second tab state
        mentorDescribeAnswer,
        photoID,
        hearAboutPressPadAnswer,
        phoneNumber,
        reference1,
        reference2,
        offerLetter,
        internshipOfficeAddress,
        emergencyContact,
        DBSCheck,
        sexualOrientation,
        degreeLevel,
        ethnicity,
        earningOfParents,
        disability,
        parentsWorkInPress,
        caringResponsibilities,
        allergies,
        backgroundAnswer,
        consentedOnPressPadTerms,
      },
    } = this.state;

    try {
      this.setState({ loading: true });
      const validData = await detailsSchema.validate(
        {
          mentorDescribeAnswer,
          photoID,
          hearAboutPressPadAnswer,
          phoneNumber,
          reference1,
          reference2,
          offerLetter,
          internshipOfficeAddress,
          emergencyContact,
          DBSCheck,
          sexualOrientation,
          degreeLevel,
          ethnicity,
          earningOfParents,
          disability,
          parentsWorkInPress,
          caringResponsibilities,
          allergies,
          backgroundAnswer,
          consentedOnPressPadTerms,
        },
        { abortEarly: false },
      );
      this.setState(({ data }) => ({ data: { ...data, ...validData } }));
    } catch ({ inner }) {
      this.setState({ loading: false });

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

      this.setState(({ errors }) => ({
        errors: { ...errors, ...newErrors },
      }));

      return;
    }
    try {
      await axios.post(API_INTERN_COMPLETE_PROFILE, { ...this.state.data });
      Modal.destroyAll();
      Modal.success({
        title: "Done",
        content: (
          <Alert
            message="Thank you"
            description="Your profile has been saved"
            type="success"
          />
        ),
        onOk: () => {
          this.props.history.push(DASHBOARD_URL);
        },
        type: "success",
        // this.setState({ loading: false, success: true });
      });
    } catch (err) {
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
    }
    this.setState({ loading: false });
  };

  render() {
    const { name, id, role } = this.props;
    const { errors, data, activeKey, loading } = this.state;
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
        activeKey={Tabs[activeKey]}
        handleSubmit={this.handleSubmit}
        profilePhotoUrl={profilePhotoUrl}
        role={role}
        loading={loading}
      />
    );
  }
}
