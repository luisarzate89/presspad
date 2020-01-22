import React, { Component } from "react";

import Content from "./Content";
import axios from "axios";
import {
  API_INTERN_COMPLETE_PROFILE,
  DASHBOARD_URL,
  API_MY_PROFILE_URL
} from "./../../../constants/apiRoutes";

import { Modal, Alert, message } from "antd";
export default class InternCreateProfile extends Component {
  state = {
    activeKey: "Profile",
    data: {
      birthDate: null,
      hometown: null,
      gender: null,
      school: null,
      profileImage: {
        fileName: null,
        isPrivate: false
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
        url: null
      },
      hearAboutPressPadAnswer: null,
      phoneNumber: null,
      reference1: {
        name: null,
        email: null
      },
      reference2: {
        name: null,
        email: null
      },
      offerLetter: {
        fileName: null,
        isPrivate: true
      },
      internshipOfficeAddress: null,
      emergencyContact: {
        name: null,
        phoneNumber: null,
        email: null
      },
      DBSCheck: {
        fileName: null,
        isPrivate: true
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
      consentedOnPressPadTerms: null
    },
    errors: {
      birthDate: null,
      hometown: null,
      gender: null,
      school: null,
      profileImage: {
        fileName: null,
        isPrivate: false
      },
      interests: null,
      bio: null,
      organisation: null,
      useReasonAnswer: null,
      issueAnswer: null,
      mentorDescribeAnswer: null,
      photoID: {
        fileName: null,
        isPrivate: false
      },
      hearAboutPressPadAnswer: null,
      phoneNumber: null,
      reference1: {
        name: null,
        email: null
      },
      reference2: {
        name: null,
        email: null
      },
      offerLetter: {
        fileName: null,
        isPrivate: false
      },
      internshipOfficeAddress: null,
      emergencyContact: {
        name: null,
        phoneNumber: null,
        email: null
      },
      DBSCheck: {
        fileName: null,
        isPrivate: false
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
      consentedOnPressPadTerms: null
    }
  };

  componentDidMount() {
    axios
      .get(API_MY_PROFILE_URL)
      .then(({ data: { profile } }) => {
        if (profile) {
          this.setState(prevState => ({
            data: {
              ...prevState.data,
              ...profile
            }
          }));
        }
      })
      .catch(err => message.error("internal server error"));
  }

  handleChange = ({ value, key, parent }) => {
    if (parent) {
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          [parent]: { ...prevState.data[parent], [key]: value }
        }
      }));
    } else {
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          [key]: value
        }
      }));
    }
  };

  handleError = ({ value, key, parent }) => {
    if (parent) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [parent]: { ...prevState.errors[parent], [key]: value }
        }
      }));
    } else {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [key]: value
        }
      }));
    }
  };

  onChangeTabs = activeKey => {
    // TODO: run validation
    this.setState({ activeKey });
  };

  handleSubmit = () => {
    //TODO: run validation
    axios
      .post(API_INTERN_COMPLETE_PROFILE, { ...this.state.data })
      .then(({ data }) => {
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
          type: "success"
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
          type: "error"
        });
        this.setState({ loading: false, erros: err.response.data });
      });
  };

  render() {
    const { name, id } = this.props;
    const { errors, data, activeKey } = this.state;
    const {
      profileImage: { url: profilePhotoUrl }
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
      />
    );
  }
}
